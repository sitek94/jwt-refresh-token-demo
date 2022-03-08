import { useAuth } from '../auth/auth.provider'
import { FormLogin } from '../components/form-login'
import * as React from 'react'

export function LoginPage() {
  const { login } = useAuth()

  return (
    <div>
      <FormLogin onSubmit={login} />
    </div>
  )
}
