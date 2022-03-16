import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Container } from '@mui/material'
import Fab from '@mui/material/Fab'
import Typography from '@mui/material/Typography'

import { ReactComponent as SecureFilesImage } from 'images/secure-files.svg'

export function UnauthorizedPage() {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', py: 8 }}>
      <SecureFilesImage />
      <Typography variant="h3" component="h1">
        Unauthorized
      </Typography>
      <Typography mb={2}>You are not authorized to access this page.</Typography>
      <Fab color="primary" variant="extended" onClick={goBack}>
        <ArrowBackIcon sx={{ mr: 1 }} />
        Go back
      </Fab>
    </Container>
  )
}
