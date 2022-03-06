import * as React from 'react'
import { UserProvider } from 'providers/user.provider'

export function AuthenticatedAppProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return <UserProvider>{children}</UserProvider>
}
