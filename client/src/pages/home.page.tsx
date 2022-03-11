import { Box, Button, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'

export function HomePage() {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
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
    </Box>
  )
}
