import axios, { AxiosRequestConfig } from 'axios'

import { AuthResponse, LoginDto, RegisterDto } from 'auth/auth.types'
import { env } from 'config/env'

export const instance = axios.create({
  baseURL: `${env.apiUrl}/auth`,
  withCredentials: true,
})

export const authApi = {
  login,
  refresh,
  register,
}

function login(dto: LoginDto) {
  return instance.post<AuthResponse>('login', dto)
}

function register(dto: RegisterDto) {
  return instance.post<AuthResponse>('register', dto)
}

function refresh(config?: AxiosRequestConfig) {
  return instance.get<AuthResponse>('refresh', config)
}
