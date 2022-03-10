import * as React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Container } from '@mui/material'

import { useUnauthenticatedContext } from 'auth/auth.provider'
import { User } from 'auth/auth.types'
import { Navbar } from 'components/navbar'
import { HomePage } from 'pages/home.page'
import { LoginPage } from 'pages/login.page'
import { RegisterPage } from 'pages/register.page'

export function UnauthenticatedApp() {
  const { login } = useUnauthenticatedContext()
  const navigate = useNavigate()

  function loginUserOnClient(user: User, accessToken: string) {
    login(user, accessToken)
    navigate('/')
  }

  return (
    <>
      <Navbar>
        <Button href="/">Home</Button>
        <ButtonGroup variant="outlined" aria-label="Login/Register">
          <Button href="/login">Login</Button>
          <Button href="/register">Register</Button>
        </ButtonGroup>
      </Navbar>
      <Container component="main" maxWidth="xs">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onSuccess={loginUserOnClient} />} />
          <Route path="/register" element={<RegisterPage onSuccess={loginUserOnClient} />} />
        </Routes>
      </Container>
    </>
  )
}
