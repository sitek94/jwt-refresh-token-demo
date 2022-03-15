import * as React from 'react'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useUsersApi } from 'features/users/users.api'
import { User } from 'features/users/users.types'

export function ManageUsersPage() {
  const api = useUsersApi()

  const [users, setUsers] = React.useState<User[]>([])

  React.useEffect(() => {
    api.getUsers().then(setUsers)
  }, [api])

  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1">
        Users
      </Typography>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </Container>
  )
}
