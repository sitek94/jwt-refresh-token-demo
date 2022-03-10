import { useAuth } from 'auth/auth.provider'

import { AuthenticatedApp } from './authenticated-app'
import { AuthenticatedAppProviders } from './authenticated-app-providers'
import { UnauthenticatedApp } from './unauthenticated-app'

export function App() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? (
    <AuthenticatedAppProviders>
      <AuthenticatedApp />
    </AuthenticatedAppProviders>
  ) : (
    <UnauthenticatedApp />
  )
}
