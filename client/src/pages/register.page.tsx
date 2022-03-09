import * as React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { useAuth } from 'auth/auth.provider'
import { RegisterForm } from 'forms/register.form'

export function RegisterPage() {
  const { register } = useAuth()
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
        <LockOutlinedIcon color="primary" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box sx={{ mt: 3 }}>
        <RegisterForm onSubmit={register} />
        <Grid container justifyContent="flex-end" mt={2}>
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
