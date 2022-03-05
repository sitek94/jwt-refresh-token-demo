import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { JwtPayload } from '../../auth/types'

export const CurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest()
    const user = request.user as JwtPayload

    /**
     * 💡
     *
     * If you're also curious what does "sub" even mean, and where it came from,
     * check this RFC:
     *
     * https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2
     *
     * In short, the "sub" (subject) claim identifies the principal that is the
     * subject of the JWT.
     */
    return user.sub
  },
)
