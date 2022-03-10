import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Button } from '@mui/material'

import { useAuthenticatedAuthContext } from 'auth/auth.provider'
import { Navbar } from 'components/navbar'
import { DashboardPage } from 'pages/dashboard.page'

export function AuthenticatedApp() {
  const { logout } = useAuthenticatedAuthContext()
  return (
    <>
      <Navbar>
        <Button onClick={logout} variant="outlined">
          Logout
        </Button>
      </Navbar>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </>
  )
}
