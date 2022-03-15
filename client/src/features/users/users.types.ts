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
