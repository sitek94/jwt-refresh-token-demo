import * as React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

// TODO: Clear initial state, it's here only for development purposes, so
//   that I don't have to type this all the time.
const initialState = {
  email: 'admin@admin.com',
  password: 'admin',
}

export type LoginFormData = typeof initialState

export function LoginForm({ onSubmit }: { onSubmit(data: LoginFormData): void }) {
  const [values, setValues] = React.useState(initialState)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            id="password"
            name="password"
            label="Password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Sign In
      </Button>
    </form>
  )
}
