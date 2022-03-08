import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Button, Container } from '@mui/material'

import { Navbar } from 'components/navbar'
import { HomePage } from 'pages/home.page'
import { LoginPage } from 'pages/login.page'
import { RegisterPage } from 'pages/register.page'

export function UnauthenticatedApp() {
  return (
    <>
      <Navbar>
        <Button href="/">Home</Button>
        <Button href="/login">Login</Button>
        <Button href="/register">Register</Button>
      </Navbar>
      <Container component="main" maxWidth="xs">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Container>
    </>
  )
}
