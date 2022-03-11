import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Fab from '@mui/material/Fab'

export function ButtonGoBack() {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <Fab color="primary" variant="extended" onClick={goBack}>
      <ArrowBackIcon sx={{ mr: 1 }} />
      Go back
    </Fab>
  )
}
