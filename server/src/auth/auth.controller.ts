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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<JwtTokens> {
    return this.authService.signin(dto, res)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@CurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId)
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @CurrentUserId() userId: string,
    @CurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<JwtTokens> {
    return this.authService.refreshTokens(userId, refreshToken, res)
  }

  @Public()
  @Get('check')
  @HttpCode(HttpStatus.OK)
  check(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.check(req, res)
  }
}
