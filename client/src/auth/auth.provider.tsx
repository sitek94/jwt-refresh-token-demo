import * as React from 'react'
import axios from 'axios'

import { SpinnerFullPage } from 'components/spinner'

const authClient = axios.create({
  baseURL: 'http://localhost:3333/auth',
  withCredentials: true,
})

type AuthContextValue = {
  accessToken: string | null
  isAuthenticated: boolean
  login(email: string, password: string): Promise<void>
  logout(): void
  setAccessToken(accessToken: string): void
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = React.useState<string | null>()

  React.useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    checkAuthStatus()

    async function checkAuthStatus() {
      try {
        const { data } = await authClient.get<{ accessToken: string } | false>(
          '/check',
          {
            signal: controller.signal,
          },
        )
        if (!data) {
          isMounted && setAccessToken(null)
        } else {
          isMounted && setAccessToken(data.accessToken)
        }
      } catch (error) {
        isMounted && setAccessToken(null)
      }
    }

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  // 🚨 It's `undefined` initially, because we don't know if the user is
  // authenticated or not. While we're waiting for the API to respond, we show
  // a loading indicator.

  // Interesting, when I assign it to a variable, there is a flash of Unauthenticated
  // App 🤔
  if (accessToken === undefined) {
    return <SpinnerFullPage />
  }

  async function login(email: string, password: string) {
    try {
      const response = await authClient.post('/signin', {
        email,
        password,
      })
      const { accessToken } = response.data
      setAccessToken(accessToken)
    } catch (error) {
      setAccessToken(null)
    }
  }

  async function logout() {
    try {
      await authClient.post('/logout', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setAccessToken(null)
    } catch (error) {
      console.error(error)
      setAccessToken(null)
    }
  }

  // There is no need to optimize this `value` with React.useMemo here, since it
  // is the top-most component in the app, so it will very rarely re-render, so
  // it's not going to cause a performance problem.
  const context = {
    isAuthenticated: !!accessToken,
    accessToken,
    login,
    logout,
    setAccessToken,
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
