import * as React from 'react'
import { AuthProvider } from 'auth/auth.provider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
