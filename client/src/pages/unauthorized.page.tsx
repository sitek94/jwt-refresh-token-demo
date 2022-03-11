import * as React from 'react'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'

import { ButtonGoBack } from 'components/button-go-back'
import { ReactComponent as SecureFilesImage } from 'images/secure-files.svg'

export function UnauthorizedPage() {
  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', py: 8 }}>
      <SecureFilesImage />
      <Typography variant="h3" component="h1">
        Unauthorized
      </Typography>
      <Typography mb={2}>You are not authorized to access this page.</Typography>
      <ButtonGoBack />
    </Container>
  )
}
