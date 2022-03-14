import * as React from 'react'

import * as authApi from 'auth/auth.api'
import { Role, User } from 'auth/auth.types'
import { SpinnerFullPage } from 'components/spinner'

type AuthContextActions = { type: 'LOGIN'; user: User; accessToken: string } | { type: 'LOGOUT' }

type State = {
  isAuthenticated: null | boolean
  user: null | User
  accessToken: null | string
}

type Context = State & {
  login(user: User, accessToken: string): void
  logout(): void
}

const AuthContext = React.createContext<Context | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(
    (state: State, action: AuthContextActions) => {
      switch (action.type) {
        case 'LOGIN': {
          return {
            isAuthenticated: true,
            user: action.user,
            accessToken: action.accessToken,
          }
        }

        case 'LOGOUT': {
          return { isAuthenticated: false, user: null, accessToken: null }
        }

        default:
          return state
      }
    },
    {
      // Null, meaning not determined yet.
      // False, meaning determined and not logged in
      // True, meaning logged in
      isAuthenticated: null,
      user: null,
      accessToken: null,
    },
  )

  React.useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    authApi
      .getMe({
        signal: controller.signal,
      })
      .then(({ data }) => {
        isMounted && login(data.user, data.accessToken)
      })
      .catch(() => {
        isMounted && logout()
      })

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const login = (user: User, accessToken: string) => {
    dispatch({ type: 'LOGIN', user, accessToken })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  // 🚨 It's `null` initially, because we don't know if the user is authenticated or not.
  // While we're waiting for the API to respond, we show a spinner.
  if (state.isAuthenticated === null) {
    return <SpinnerFullPage />
  }

  // There is no need to optimize this `value` with React.useMemo here, since it
  // is the top-most component in the app, so it will very rarely re-render, so
  // it's not going to cause a performance problem.
  const context: Context = {
    ...state,
    login,
    logout,
  }

  return <AuthContext.Provider value={context} children={children} />
}

export function useAuthContext() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

/**
 * This hook should be used within `AuthenticatedApp`. It ensures, that the user is defined
 * and authenticated. If not, it'll throw, you're doing something wrong 🙊
 */
export function useAuthenticatedContext() {
  const { isAuthenticated, user, accessToken, logout } = useAuthContext()
  if (!isAuthenticated || !user || !accessToken) {
    throw new Error('`useAuthenticatedAuthContext` must be used only when user is authenticated')
  }

  return {
    isAuthenticated,
    user,
    accessToken,
    logout,
    isAdmin: user.roles.includes(Role.ADMIN),
  }
}

/**
 * This hook should be used within `UnauthenticatedApp`.
 */
export function useUnauthenticatedContext() {
  const { isAuthenticated, user, login } = useAuthContext()
  if (isAuthenticated || user) {
    throw new Error(
      '`useUnauthenticatedAuthContext` must be used only when user is not authenticated',
    )
  }

  return {
    isAuthenticated,
    login,
  }
}
