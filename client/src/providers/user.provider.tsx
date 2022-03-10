import * as React from 'react'

export interface User {
  id: string
  email: string
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
}

const UserContext = React.createContext<User | undefined>(undefined)

export function UserProvider({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
