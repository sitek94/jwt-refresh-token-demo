import * as React from 'react'
import { Button } from '@mui/material'

import { useAuth } from 'auth/auth.provider'
import { Navbar } from 'components/navbar'
import { useUser } from 'providers/user.provider'

export function AuthenticatedApp() {
  const user = useUser()
  const { logout } = useAuth()
  return (
    <>
      <Navbar>
        <Button onClick={logout} variant="outlined">
          Logout
        </Button>
      </Navbar>
      <main>
        <h1>Hello, {user.email}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </main>
    </>
  )
}
