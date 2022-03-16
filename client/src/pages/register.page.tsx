import * as React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { authApi } from 'auth/auth.api'
import { User } from 'auth/auth.types'
import { RegisterForm, RegisterFormData } from 'forms/register.form'

type Props = {
  onSuccess(user: User, accessToken: string): void
}

export function RegisterPage({ onSuccess }: Props) {
  function handleSubmit(formData: RegisterFormData) {
    authApi
      .register(formData)
      .then(({ data }) => {
        onSuccess(data.user, data.accessToken)
      })
      .catch(error => {
        console.error(error)
      })
  }
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
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
        <RegisterForm onSubmit={handleSubmit} />
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
