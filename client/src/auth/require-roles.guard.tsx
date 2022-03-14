import * as React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuthenticatedContext } from 'auth/auth.provider'
import { Role } from 'auth/auth.types'

type Props = {
  roles: Role[]
}

export function RequireRoles({ roles }: Props) {
  const { user } = useAuthenticatedContext()
  if (!user.roles.find(role => roles.includes(role))) {
    return <Navigate to="/unauthorized" />
  }

  return <Outlet />
}
