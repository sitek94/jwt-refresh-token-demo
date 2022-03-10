import { apiAxios } from 'api/api.instance'
import { useAuthContext } from 'auth/auth.provider'
import { AuthResponse } from 'auth/auth.types'

export function useRefreshAccessToken() {
  const { login } = useAuthContext()

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
