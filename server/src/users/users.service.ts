import { ForbiddenException, Injectable } from '@nestjs/common'
import { Role } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'

import { PrismaService } from 'src/prisma/prisma.service'

import { CreateUserDto, EditUserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  private userSelect = {
    id: true,
    roles: true,
    email: true,
    firstName: true,
    lastName: true,
    createdAt: true,
    updatedAt: true,
    hash: false,
    refreshTokenHash: false,
  }

  async createUser(dto: CreateUserDto) {
    const hash = await argon.hash(dto.password)

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          hash,
          roles: [Role.USER],
        },
        select: this.userSelect,
      })

      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('The email is already taken')
        }
        throw error
      }
    }
  }

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: this.userSelect,
    })

    return users
  }

  async getMe(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: this.userSelect,
    })

    return user
  }

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...dto,
      },
      select: this.userSelect,
    })

    return user
  }
}
