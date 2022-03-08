import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from 'auth/auth.provider'
import { ThemeProvider } from 'providers/theme.provider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
