import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export function LoginForm({
  onSubmit,
}: {
  onSubmit(email: string, password: string): void
}) {
  // TODO: Remove initial states, it's here only for development purposes, so
  //   that I don't have to type this all the time.
  const [email, setEmail] = React.useState('maciek@maciek.com')
  const [password, setPassword] = React.useState('maciek')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        id="email"
        name="email"
        label="Email Address"
        autoComplete="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        margin="normal"
        fullWidth
        required
        autoFocus
      />
      <TextField
        type="password"
        id="password"
        name="password"
        label="Password"
        autoComplete="current-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Sign In
      </Button>
    </form>
  )
}
