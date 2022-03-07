import * as React from 'react'
import axios from 'axios'
import { env } from 'config/env'
import { useAuth } from 'auth/auth.provider'
import { useRefreshAccessToken } from '../auth/use-refresh-token'

export const apiAxios = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export function useApiAxios() {
  const refreshAccessToken = useRefreshAccessToken()
  const { accessToken } = useAuth()

  React.useEffect(() => {
    const requestInterceptor = apiAxios.interceptors.request.use(
      config => {
        // There is no Authorization header in the request
        if (config.headers && !config.headers['Authorization'] && accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error),
    )

    const responseInterceptor = apiAxios.interceptors.response.use(
      response => response,
      async error => {
        const previousRequest = error?.config
        if (error?.response?.status === 403 && !previousRequest?.sent) {
          previousRequest.sent = true
          const newAccessToken = await refreshAccessToken()
          previousRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return apiAxios(previousRequest)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      apiAxios.interceptors.request.eject(requestInterceptor)
      apiAxios.interceptors.response.eject(responseInterceptor)
    }
  }, [accessToken, refreshAccessToken])

  return apiAxios
}
