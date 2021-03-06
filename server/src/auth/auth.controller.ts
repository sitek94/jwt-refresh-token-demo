import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { Cookies } from 'src/common/decorators/cookies.decorator'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { CurrentUserId } from 'src/common/decorators/current-user-id.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard'

import { REFRESH_TOKEN } from './auth.constants'
import { AuthService } from './auth.service'
import { AuthDto, RegisterDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.register(dto, response)
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() dto: AuthDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(dto, response)
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(
    @CurrentUserId() userId: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.authService.logout(userId, response)
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @CurrentUserId() userId: string,
    @CurrentUser(REFRESH_TOKEN) refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refreshTokens(userId, refreshToken, response)
  }

  @Public()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  getMe(
    @Res({ passthrough: true }) response: Response,
    @Cookies(REFRESH_TOKEN) refreshToken?: string,
  ) {
    return this.authService.getMe(response, refreshToken)
  }
}
