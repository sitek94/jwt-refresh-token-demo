import * as React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { useUnauthenticatedContext } from 'auth/auth.provider'
import { User } from 'auth/auth.types'
import { UnauthenticatedAppLayout } from 'components/unauthenticated-app-layout'
import { AboutPage } from 'pages/about.page'
import { HomePage } from 'pages/home.page'
import { LoginPage } from 'pages/login.page'
import { RegisterPage } from 'pages/register.page'
import { ResourcesPage } from 'pages/resources.page'

export function UnauthenticatedApp() {
  const { login } = useUnauthenticatedContext()
  const navigate = useNavigate()

  function loginUserOnClient(user: User, accessToken: string) {
    login(user, accessToken)
    navigate('/')
  }

  return (
    <Routes>
      <Route path="/" element={<UnauthenticatedAppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/login" element={<LoginPage onSuccess={loginUserOnClient} />} />
        <Route path="/register" element={<RegisterPage onSuccess={loginUserOnClient} />} />
      </Route>
    </Routes>
  )
}
