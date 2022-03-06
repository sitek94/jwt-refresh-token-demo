import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'

import { CurrentUserId } from '../common/decorators'
import { AccessTokenGuard } from '../common/guards'
import { EditUserDto } from './dto'
import { UsersService } from './users.service'

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  getMe(@CurrentUserId() userId: string) {
    return this.userService.getMe(userId)
  }

  @Patch()
  editUser(@CurrentUserId() userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto)
  }
}
