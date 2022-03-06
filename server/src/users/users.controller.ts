import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'

import { CurrentUser, CurrentUserId } from '../common/decorators'
import { AccessTokenGuard } from '../common/guards'
import { EditUserDto } from './dto'
import { UsersService } from './users.service'

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user
  }

  @Patch()
  editUser(@CurrentUserId() userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto)
  }
}
