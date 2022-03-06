import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import { useAuth } from 'auth/auth.provider'
import { AuthenticatedAppProviders } from './authenticated-app-providers'

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
