import * as React from 'react'
import axios from 'axios'
import { env } from 'config/env'
import { useAuth } from 'auth/auth.provider'

export const apiAxios = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export function useApiAxios() {
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
      error => Promise.reject(error),
    )
  }, [])

  return apiAxios
}
