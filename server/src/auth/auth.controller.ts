import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'

import { CurrentUser, CurrentUserId, Public } from '../common/decorators'
import { RefreshTokenGuard } from '../common/guards'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'
import { JwtTokens } from './types'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: AuthDto): Promise<JwtTokens> {
    console.log(dto)
    return this.authService.signup(dto)
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: AuthDto): Promise<JwtTokens> {
    return this.authService.signin(dto)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@CurrentUserId() userId: string): Promise<boolean> {
    console.log(userId)
    return this.authService.logout(userId)
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @CurrentUserId() userId: string,
    @CurrentUser('refreshToken') refreshToken: string,
  ): Promise<JwtTokens> {
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
