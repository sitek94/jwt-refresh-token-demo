import * as React from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { useAuth } from 'auth/auth.provider'
import { LoginForm } from 'forms/login.form'

export function LoginPage() {
  const { login } = useAuth()

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar
        sx={{
          m: 1,
          border: 2,
          borderColor: 'primary.main',
          bgcolor: 'transparent',
        }}
      >
        <LockOpenIcon color="primary" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box sx={{ mt: 1 }}>
        <LoginForm onSubmit={login} />
        <Grid container mt={2} justifyContent="flex-end">
          <Grid item>
            <Link href="/register" variant="body2">
              {`Don't have an account? Sign Up`}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}