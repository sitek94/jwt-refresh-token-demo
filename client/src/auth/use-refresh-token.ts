import { apiAxios } from 'api/api.instance'
import { useAuth } from 'auth/auth.provider'
import { AuthResponse } from 'auth/auth.types'

export function useRefreshAccessToken() {
  const { login } = useAuth()

  async function refreshAccessToken() {
    const { data } = await apiAxios.get<AuthResponse>('refresh', {
      withCredentials: true,
    })
    const { user, accessToken } = data
    login(user, accessToken)
    return accessToken
  }

  return refreshAccessToken
}
