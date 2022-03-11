import { authApi } from 'auth/auth.api'
import { useAuthContext } from 'auth/auth.provider'

export function useRefreshAccessToken() {
  const { login } = useAuthContext()

  async function refreshAccessToken() {
    const { data } = await authApi.refreshToken()
    const { user, accessToken } = data
    login(user, accessToken)
    return accessToken
  }

  return refreshAccessToken
}
