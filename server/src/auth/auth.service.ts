import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Role } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'
import { Response } from 'express'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../auth/auth.constants'
import { PrismaService } from '../prisma/prisma.service'
import { AuthDto, RegisterDto } from './dto'
import { JwtPayload, JwtTokens } from './types'

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private refreshTokenSecret = this.configService.get<string>('REFRESH_TOKEN_SECRET')
  private accessTokenSecret = this.configService.get<string>('ACCESS_TOKEN_SECRET')

  async register(dto: RegisterDto, response: Response) {
    // Generate password hash
    const hash = await argon.hash(dto.password)

    try {
      // Save new user in the db
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          hash,
          roles: [Role.USER],
        },
      })

      const tokens = await this.getTokens({
        userId: user.id,
        email: user.email,
      })
      await this.updateRefreshTokenHash(user.id, tokens.refreshToken)
      this.appendRefreshTokenCookie(tokens.refreshToken, response)

      delete user.hash
      delete user.refreshTokenHash

      return {
        accessToken: tokens.accessToken,
        user,
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('The email is already taken')
        }
        throw error
      }
    }
  }

  async login(dto: AuthDto, response: Response) {
    // Find the user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    // If no user was found, throw an error
    if (!user) {
      throw new ForbiddenException('User not found')
    }

    // Check if the password is correct
    const valid = await argon.verify(user.hash, dto.password)
    if (!valid) {
      throw new ForbiddenException('Invalid password')
    }

    const tokens = await this.getTokens({
      userId: user.id,
      email: user.email,
    })
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken)

    this.appendRefreshTokenCookie(tokens.refreshToken, response)

    delete user.hash
    delete user.refreshTokenHash

    return {
      accessToken: tokens.accessToken,
      user,
    }
  }

  async logout(userId: string, response: Response) {
    // We're using `updateMany` so that we can make sure that the refresh token
    // is actually not null. It should prevent spamming the logout endpoint, and
    // setting the refresh token to null even if it's already null.
    // More info: https://www.youtube.com/watch?v=uAKzFhE3rxU&t=4742s

    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        refreshTokenHash: {
          not: null,
        },
      },
      data: {
        refreshTokenHash: null,
      },
    })

    response.clearCookie(REFRESH_TOKEN)
  }

  async refreshTokens(userId: string, refreshToken: string, response: Response) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) {
      throw new ForbiddenException('User not found')
    }

    if (!user.refreshTokenHash) {
      throw new ForbiddenException('Access Denied')
    }

    const valid = await argon.verify(user.refreshTokenHash, refreshToken)
    if (!valid) {
      throw new ForbiddenException('Invalid refresh token')
    }

    const tokens = await this.getTokens({
      userId: user.id,
      email: user.email,
    })
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken)

    this.appendRefreshTokenCookie(tokens.refreshToken, response)

    delete user.hash
    delete user.refreshTokenHash

    return {
      [ACCESS_TOKEN]: tokens.accessToken,
      user,
    }
  }

  async getMe(response: Response, refreshToken?: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token')
    }

    const { sub: userId } = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.refreshTokenSecret,
    })
    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })
    const valid = await argon.verify(user.refreshTokenHash, refreshToken)
    if (!valid) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const tokens = await this.getTokens({
      userId: user.id,
      email: user.email,
    })
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken)

    this.appendRefreshTokenCookie(tokens.refreshToken, response)

    delete user.hash
    delete user.refreshTokenHash

    return {
      [ACCESS_TOKEN]: tokens.accessToken,
      user,
    }
  }

  async getTokens({ userId, email }: { userId: string; email: string }): Promise<JwtTokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '15min',
        secret: this.accessTokenSecret,
      }),
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '7d',
        secret: this.refreshTokenSecret,
      }),
    ])

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }

  async updateRefreshTokenHash(userId: string, refreshToken: string): Promise<void> {
    const hash = await argon.hash(refreshToken)

    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: hash,
      },
    })
  }

  appendRefreshTokenCookie(refreshToken: string, response: Response) {
    response.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(new Date().getTime() + 24 * 60 * 1000),
      path: '/',
    })
  }
}
