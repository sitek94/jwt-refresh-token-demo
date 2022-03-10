import * as React from 'react'

import { api } from 'api'
import { SpinnerFullPage } from 'components/spinner'
import { User } from 'providers/user.provider'

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
    api.auth
      .refresh({
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

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
