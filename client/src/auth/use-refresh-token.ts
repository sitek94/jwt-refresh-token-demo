import { apiAxios } from 'api/api.instance'
import { useAuth } from 'auth/auth.provider'

export function useRefreshAccessToken() {
  const { setAccessToken } = useAuth()

  async function refreshAccessToken() {
    const response = await apiAxios.get<{ accessToken: string }>('/refresh', {
      withCredentials: true,
    })
    const newAccessToken = response.data.accessToken

    setAccessToken(newAccessToken)
    return newAccessToken
  }

  return refreshAccessToken
}
