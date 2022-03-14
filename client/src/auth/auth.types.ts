export interface LoginDto {
  email: string
  password: string
}

export interface LogoutDto {
  accessToken: string
}

export interface RegisterDto {
  email: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface User {
  id: string
  email: string
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  roles: Role[]
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
