import * as React from 'react'
import { useAuth } from '../auth/auth.provider'

export function AuthenticatedApp() {
  const { accessToken } = useAuth()
  return (
    <div>
      <h1>Authenticated App</h1>
      <p style={{ wordBreak: 'break-word' }}>{accessToken}</p>
    </div>
  )
}
