export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
}
