import * as React from 'react'
import { FullPageSpinner } from '../components'
import { useApiAxios } from '../api/api.instance'

interface User {
  id: string
  email: string
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
}

const UserContext = React.createContext<User | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const axios = useApiAxios()
  const [user, setUser] = React.useState<User>()

  React.useEffect(() => {
    fetchUser()

    async function fetchUser() {
      try {
        const response = await axios.get('/users/me')
        setUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  if (!user) {
    return <FullPageSpinner />
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
