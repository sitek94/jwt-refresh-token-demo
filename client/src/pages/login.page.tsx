import { useAuth } from '../auth/auth.provider'
import { FormLogin } from '../components/form-login'
import * as React from 'react'

export function LoginPage() {
  const { login } = useAuth()

  return (
    <div>
      <hgroup>
        <h1>Sign in</h1>
        <h2>And watch the magic happen</h2>
      </hgroup>
      <FormLogin onSubmit={login} />
    </div>
  )
}
