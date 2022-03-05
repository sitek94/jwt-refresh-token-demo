import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { JwtWithRefreshTokenPayload } from '../../auth/types'

export const CurrentUser = createParamDecorator(
  (
    data: keyof JwtWithRefreshTokenPayload | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest()
    if (data) {
      return request.user[data]
    }
    return request.user
  },
)
