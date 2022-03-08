import * as React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const initialState = {
  email: 'nikola@tesla.com',
  password: 'future',
  passwordConfirm: 'future',
  firstName: 'Nikola',
  lastName: 'Tesla',
}

export function RegisterForm({
  onSubmit,
}: {
  onSubmit(data: typeof initialState): void
}) {
  // TODO: Remove initial states, it's here only for development purposes, so
  //   that I don't have to type this all the time.
  const [values, setValues] = React.useState(initialState)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            autoComplete="given-name"
            value={values.firstName}
            onChange={handleChange}
            fullWidth
            required
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            autoComplete="family-name"
            value={values.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="email"
            id="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            id="password"
            name="password"
            label="Password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            label="Password Confirmation"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Sign Up
      </Button>
    </form>
  )
}
