import axios, { AxiosRequestConfig } from 'axios'

import { AuthResponse, LoginDto, RegisterDto } from 'auth/auth.types'

export const instance = axios.create({
  baseURL: 'http://localhost:3333/auth/',
  withCredentials: true,
})

export function login(dto: LoginDto) {
  return instance.post<AuthResponse>('login', dto)
}

export function register(dto: RegisterDto) {
  return instance.post<AuthResponse>('register', dto)
}

export function refresh(config?: AxiosRequestConfig) {
  return instance.get<AuthResponse>('refresh', config)
}
