import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { EditUserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })

    // TODO(#1): Research a better way to do this
    delete user.hash
    delete user.refreshTokenHash

    return user
  }

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...dto,
      },
    })

    delete user.hash

    return user
  }
}
