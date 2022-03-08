import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/login.page'
import { HomePage } from '../pages/home.page'
import { Navbar } from '../components/navbar'
import { Button, Container } from '@mui/material'

export function UnauthenticatedApp() {
  return (
    <>
      <Navbar>
        <Button href="/">Home</Button>
        <Button href="/login">Login</Button>
        <Button href="/Register">Register</Button>
      </Navbar>
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </>
  )
}
