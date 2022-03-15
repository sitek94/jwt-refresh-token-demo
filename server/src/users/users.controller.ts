import { Body, Controller, Get, Patch } from '@nestjs/common'
import { Role } from '@prisma/client'

import { CurrentUserId } from 'src/common/decorators/current-user-id.decorator'
import { Roles } from 'src/common/decorators/roles.decorator'

import { EditUserDto } from './dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(Role.ADMIN)
  @Get()
  async getUsers() {
    return this.userService.getUsers()
  }

  @Patch()
  editUser(@CurrentUserId() userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto)
  }

  @Get('me')
  getMe(@CurrentUserId() userId: string) {
    console.log('ME')
    return this.userService.getMe(userId)
  }
}
