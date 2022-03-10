import * as React from 'react'

import { useAuth } from 'auth/auth.provider'
import { User, UserProvider } from 'providers/user.provider'

export function AuthenticatedAppProviders({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  return <UserProvider user={user as User}>{children}</UserProvider>
}
