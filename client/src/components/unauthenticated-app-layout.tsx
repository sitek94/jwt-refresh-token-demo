import * as React from 'react'
import { Link, matchPath, Outlet, useLocation } from 'react-router-dom'
import { Button, ButtonGroup } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { app } from 'config/app'

const pages = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/about',
    title: 'About',
  },
  {
    path: '/resources',
    title: 'Resources',
  },
]

export function UnauthenticatedAppLayout() {
  const routeMatch = useRouteMatch(pages.map(p => p.path))
  const currentTab = routeMatch?.pattern?.path

  return (
    <Box>
      <AppBar position="static" sx={{ height: 64 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            {app.name}
          </Typography>

          <Tabs
            // `Tabs` expects false when there should be no tab selected
            value={currentTab || false}
            sx={{
              height: '100%',
              flexGrow: 1,
              alignItems: 'center',
              '.MuiTabs-scroller': {
                display: 'inline-flex',
                height: '100%',
              },
            }}
          >
            {pages.map(({ title, path }) => (
              <Tab key={title} value={path} to={path} label={title} component={Link} />
            ))}
          </Tabs>

          <ButtonGroup variant="outlined" aria-label="Login/Register">
            <Button href="/login">Login</Button>
            <Button href="/register">Register</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation()

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    const possibleMatch = matchPath(pattern, pathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}
