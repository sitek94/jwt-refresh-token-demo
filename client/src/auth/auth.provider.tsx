import * as React from 'react'
import { FullPageSpinner } from '../components'
import axios from 'axios'

const authClient = axios.create({
  baseURL: 'http://localhost:3333/auth',
  withCredentials: true,
})

type AuthContextValue = {
  accessToken?: string | null
  isAuthenticated: boolean
  login(email: string, password: string): Promise<void>
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
        const response = await authClient.get('/check', {
          signal: controller.signal,
        })
        const { access_token } = response.data
        setAccessToken(access_token)
      } catch (error) {
        setAccessToken(null)
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
  const isCheckingAuthStatus = accessToken === undefined
  if (isCheckingAuthStatus === undefined) {
    return <FullPageSpinner />
  }

  async function login(email: string, password: string) {
    try {
      const response = await authClient.post('/signin', {
        email,
        password,
      })
      const { access_token } = response.data
      setAccessToken(access_token)
    } catch (error) {
      setAccessToken(null)
    }
  }

  // If we received an access token, we're authenticated 🥳
  const isAuthenticated = accessToken !== null

  // There is no need to optimize this `value` with React.useMemo here, since it
  // is the top-most component in the app, so it will very rarely re-render, so
  // it's not going to cause a performance problem.
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, accessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
