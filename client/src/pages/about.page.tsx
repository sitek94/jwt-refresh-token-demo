import * as React from 'react'
import { GitHub } from '@mui/icons-material'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { ReactComponent as ProudCoderImage } from 'images/proud-coder.svg'

export function AboutPage() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <ProudCoderImage />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          Hi, I'm Maciek 👋
        </Typography>

        <Typography paragraph>
          In this project I'm diving into JSON Web Tokens based authentication using React and
          NestJS.
        </Typography>

        <Fab color="primary" variant="extended" component={Link} href="/github">
          <GitHub sx={{ mr: 1 }} />
          Source Code
        </Fab>
      </Grid>
    </Grid>
  )
}
