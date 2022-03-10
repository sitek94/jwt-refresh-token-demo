import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Button } from '@mui/material'

import { useAuthenticatedContext } from 'auth/auth.provider'
import { Navbar } from 'components/navbar'
import { DashboardPage } from 'pages/dashboard.page'

export function AuthenticatedApp() {
  const { logout } = useAuthenticatedContext()
  return (
    <>
      <Navbar>
        <Button onClick={logout} variant="outlined">
          Logout
        </Button>
      </Navbar>
      <Routes>
        <Route path="/" element={<DashboardPage />} />

        {/* SHARED */}
        <Route
          // Edit my account
          path="/profile"
          element={<DashboardPage />}
        />

        {/* USER */}
        <Route
          // Something that User can do, but Admin not, I have no idea what it could be 😂
          // It doesn't really have to be legit though, it's just for demonstration purposes.
          path="/crazy-stuff"
          element={<DashboardPage />}
        />

        {/* ADMIN */}
        <Route
          // View all registered users
          path="/users"
          element={<DashboardPage />}
        />
      </Routes>
    </>
  )
}
