import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { ReactComponent as BuildingBlocksImage } from 'images/building-blocks.svg'

const resources = [
  {
    title: 'Authentication in React Applications',
    url: 'https://kentcdodds.com/blog/authentication-in-react-applications',
    description: 'by Kent C. Dodds',
  },
  {
    title: 'NestJs JWT - Access Tokens & Refresh Tokens ',
    url: 'https://youtu.be/uAKzFhE3rxU',
    description: 'by Vlad Agaev',
  },
  {
    title: 'React JWT Authentication',
    url: 'https://github.com/gitdagray/react_jwt_auth',
    description: 'by Dave Gray',
  },
  {
    title: 'React Security Fundamentals ',
    url: 'https://courses.reactsecurity.io/view/courses/react-security-fundamentals/302432-handling-auth-state/864672-check-if-the-user-is-currently-authenticated',
    description: 'by Ryan Chekie',
  },
  {
    title: 'NestJS Demo',
    url: 'https://github.com/sitek94/nestjs-demo',
    description: 'repo that I used as a starter for server part of this project',
  },
  {
    title: 'Create React App ',
    url: 'https://create-react-app.dev',
    description: 'boilerplate for the client part of the project',
  },
  {
    title: 'Local Storage vs Cookies',
    url: 'https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id',
    description: 'All You Need to Know About Storing JWT in the Frontend',
  },
  {
    title: 'Material UI',
    url: 'https://mui.com/',
    description: 'beautiful UI components',
  },
  {
    title: 'React Workshop',
    url: 'https://github.com/ReactTraining/react-workshop',
    description: 'amazing workshop materials from React Training',
  },
  {
    title: 'unDraw',
    url: 'https://undraw.co/',
    description: 'gorgeous illustrations',
  },
]

export function ResourcesPage() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <BuildingBlocksImage />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          Resources
        </Typography>
        <Box component="ul" sx={{ paddingLeft: 2 }}>
          {resources.map(({ url, title, description }) => (
            <li key={title}>
              <Link href={url}>{title}</Link> <span>{description}</span>
            </li>
          ))}
        </Box>
      </Grid>
    </Grid>
  )
}
