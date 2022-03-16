import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'

import { Role } from 'auth/auth.types'
import { RequireRoles } from 'auth/require-roles.guard'
import { AuthenticatedAppLayout } from 'components/authenticated-app-layout'
import { DashboardPage } from 'pages/dashboard.page'
import { ManageUsersPage } from 'pages/manage-users.page'
import { UnauthorizedPage } from 'pages/unauthorized.page'

export function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticatedAppLayout />}>
        <Route index element={<DashboardPage />} />

        {/* SHARED */}
        <Route
          // Edit my account
          path="profile"
          element={<ProfilePage />}
        />

        {/* USER */}
        <Route element={<RequireRoles roles={[Role.USER]} />}>
          <Route
            // Something that User can do, but Admin not, I have no idea what it could be 😂
            // It doesn't really have to be legit though, it's just for demonstration purposes.
            path="crazy-stuff"
            element={<CrazyStuffPage />}
          />
        </Route>

        {/* ADMIN */}
        <Route path="admin" element={<RequireRoles roles={[Role.ADMIN]} />}>
          <Route path="users" element={<ManageUsersPage />} />
        </Route>

        <Route path="unauthorized" element={<UnauthorizedPage />} />
      </Route>
    </Routes>
  )
}

function ProfilePage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1">
        Profile
      </Typography>
      <Typography variant="body1" gutterBottom>
        Everyone can see this page.
      </Typography>
    </Container>
  )
}

export function CrazyStuffPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1">
        Crazy Stuff
      </Typography>
      <Typography variant="body1" gutterBottom>
        Everyone can see this page.
      </Typography>
    </Container>
  )
}
