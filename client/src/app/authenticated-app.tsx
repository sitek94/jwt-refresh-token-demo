import * as React from 'react'

import { NavAuthenticated } from 'components'
import { useUser } from 'providers/user.provider'

export function AuthenticatedApp() {
  const user = useUser()
  return (
    <div className="layout">
      <NavAuthenticated />
      <main>
        <h1>Hello, {user.email}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </main>
    </div>
  )
}
