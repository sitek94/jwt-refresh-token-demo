import axios, { AxiosRequestConfig } from 'axios'

import { AuthResponse, LoginDto, LogoutDto, RegisterDto } from 'auth/auth.types'
import { env } from 'config/env'

export const instance = axios.create({
  baseURL: `${env.apiUrl}/auth`,
  withCredentials: true,
})

export const authApi = {
  login,
  refreshToken,
  register,
  logout,
  getMe,
}

export function login(dto: LoginDto) {
  return instance.post<AuthResponse>('login', dto)
}

export function register(dto: RegisterDto) {
  return instance.post<AuthResponse>('register', dto)
}

export function logout(dto: LogoutDto) {
  return instance.post(
    'logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${dto.accessToken}`,
      },
    },
  )
}

export function refreshToken(config?: AxiosRequestConfig) {
  return instance.get<AuthResponse>('refresh', config)
}

export function getMe(config?: AxiosRequestConfig) {
  return instance.get<AuthResponse>('me', config)
}
