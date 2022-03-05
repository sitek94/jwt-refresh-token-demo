import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'

import { CurrentUser, CurrentUserId } from '../common/decorators'
import { AccessTokenGuard } from '../common/guards'
import { EditUserDto } from './dto'
import { UserService } from './user.service'

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user
  }

  @Patch()
  editUser(@CurrentUserId() userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto)
  }
}
