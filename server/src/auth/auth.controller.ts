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
    return this.authService.signup(dto)
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(
    @Body() dto: AuthDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<JwtTokens> {
    return this.authService.signin(dto, response)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @CurrentUserId() userId: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<boolean> {
    return this.authService.logout(userId, response)
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @CurrentUserId() userId: string,
    @CurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<JwtTokens> {
    return this.authService.refreshTokens(userId, refreshToken, response)
  }

  @Public()
  @Get('check')
  @HttpCode(HttpStatus.OK)
  check(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.check(request, response)
  }
}
