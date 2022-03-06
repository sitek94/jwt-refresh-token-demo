import { useAuth } from './auth.provider'

export function useRefreshToken() {
  const { accessToken } = useAuth()

  console.log()
  return
}
