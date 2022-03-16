import * as React from 'react'
import { Button, Stack } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { ReactComponent as WelcomingImage } from 'images/welcoming.svg'

export function HomePage() {
  return (
    <Grid container>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <WelcomingImage style={{ maxHeight: '75vh' }} />
      </Grid>

      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="h2" component="h1">
          Hello Stranger
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
          suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Stack spacing={2} direction="row">
          <Button variant="contained" size="large" href="/register">
            Register
          </Button>
          <Button variant="outlined" size="large" href="/login">
            Login
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
