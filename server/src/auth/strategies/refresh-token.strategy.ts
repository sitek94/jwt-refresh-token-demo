import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtPayload, JwtWithRefreshTokenPayload } from '../types'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: JwtPayload): JwtWithRefreshTokenPayload {
    const refreshToken = req.get('Authorization')?.replace('Bearer ', '')?.trim()

    if (!refreshToken) {
      throw new ForbiddenException('Wrong or missing refresh token')
    }

    return {
      ...payload,
      refreshToken,
    }
  }
}
