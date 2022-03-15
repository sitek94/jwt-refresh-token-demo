import * as React from 'react'
import { User } from 'features/users/users.types'

import { usePrivateAxios } from 'auth/hooks/use-private-axios'

export function useUsersApi() {
  const axios = usePrivateAxios()

  const api = React.useMemo(() => {
    return {
      async getUsers() {
        const response = await axios.get<User[]>('/users')
        return response.data
      },
    }
  }, [axios])

  return api
}
