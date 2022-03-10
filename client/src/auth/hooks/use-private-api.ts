import * as React from 'react'
import axios from 'axios'

import { useAuthContext } from 'auth/auth.provider'
import { useRefreshAccessToken } from 'auth/hooks/use-refresh-token'
import { env } from 'config/env'

export const instance = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export function usePrivateApi() {
  const refreshAccessToken = useRefreshAccessToken()
  const { accessToken } = useAuthContext()

  React.useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      config => {
        // There is no Authorization header in the request
        if (config.headers && !config.headers['Authorization'] && accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error),
    )

    const responseInterceptor = instance.interceptors.response.use(
      response => response,
      async error => {
        const previousRequest = error?.config
        if (error?.response?.status === 403 && !previousRequest?.sent) {
          previousRequest.sent = true
          const newAccessToken = await refreshAccessToken()
          previousRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return instance(previousRequest)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      instance.interceptors.request.eject(requestInterceptor)
      instance.interceptors.response.eject(responseInterceptor)
    }
  }, [accessToken, refreshAccessToken])

  return instance
}
