import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import { useAuth } from '../auth/auth.provider'

export function App() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />
}
