import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { AirportShuttle, Mail, People } from '@mui/icons-material'
import { ListSubheader } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { useAuthenticatedContext } from 'auth/auth.provider'
import { AccountMenu } from 'components/authenticated-dropdown-menu'
import { app } from 'config/app'

const drawerWidth = 240

export function AuthenticatedAppLayout() {
  const { isAdmin } = useAuthenticatedContext()

  return (
    <Box display="flex">
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {app.name}
          </Typography>
          <nav>
            <AccountMenu />
          </nav>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Mail />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AirportShuttle />
              </ListItemIcon>
              <ListItemText primary="Stuff" />
            </ListItem>
          </List>

          {isAdmin && (
            <>
              <Divider />
              <List subheader={<ListSubheader>Admin</ListSubheader>}>
                <ListItem button component={Link} href="/admin/users">
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemText primary="Manage users" />
                </ListItem>
              </List>
            </>
          )}
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
