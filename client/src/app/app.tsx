import { useAuthContext } from 'auth/auth.provider'

import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'

export function App() {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />
}
