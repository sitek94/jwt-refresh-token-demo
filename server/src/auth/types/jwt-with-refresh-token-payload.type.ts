import { JwtPayload } from './jwt-payload.type'

export type JwtWithRefreshTokenPayload = {
  refreshToken: string
} & JwtPayload
