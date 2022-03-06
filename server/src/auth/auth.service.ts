import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'

import { PrismaService } from '../prisma/prisma.service'
import { AuthDto } from './dto'
import { JwtPayload, JwtTokens } from './types'
import { Request, Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: AuthDto): Promise<JwtTokens> {
    // Generate password hash
    const hash = await argon.hash(dto.password)

    try {
      // Save new user in the db
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
        },
      })

      const tokens = await this.getTokens({
        userId: user.id,
        email: user.email,
      })
      await this.updateRefreshTokenHash(user.id, tokens.refresh_token)
      return tokens
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('The email is already taken')
        }
        throw error
      }
    }
  }

  async signin(dto: AuthDto, res: Response): Promise<JwtTokens> {
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
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token)

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(new Date().getTime() + 24 * 60 * 1000),
      path: '/',
    })

    return tokens
  }

  async logout(userId: string) {
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
    return true
  }

  async refreshTokens(userId: string, refreshToken: string, res: Response) {
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
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token)

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(new Date().getTime() + 24 * 60 * 1000),
      path: '/',
    })

    return tokens
  }

  async check(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token']
    if (!refreshToken) {
      throw new ForbiddenException('Access Denied')
    }

    const { sub: userId } = await this.jwtService.decode(refreshToken)
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })

    const valid = await argon.verify(user.refreshTokenHash, refreshToken)
    if (!valid) {
      throw new ForbiddenException('Invalid refresh token')
    }

    const tokens = await this.getTokens({
      userId: user.id,
      email: user.email,
    })
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token)

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(new Date().getTime() + 24 * 60 * 1000),
      path: '/',
    })

    return {
      access_token: tokens.access_token,
    }
  }

  async getTokens({
    userId,
    email,
  }: {
    userId: string
    email: string
  }): Promise<JwtTokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '15min',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '7d',
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      }),
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async updateRefreshTokenHash(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
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
}
