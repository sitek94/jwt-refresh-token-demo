import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'

export function AdminUsersPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1">
        Users
      </Typography>
      <Typography variant="body1" gutterBottom>
        Only ADMIN users can see this page.
      </Typography>
    </Container>
  )
}
