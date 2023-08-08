import React from 'react'
import styled from 'styled-components'
import InboxIcon from '@mui/icons-material/Inbox'
import EmailIcon from '@mui/icons-material/Email'
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

const Sidebar: React.FC = () => {
  return (
    <DrawerContainer>
      <Drawer
        variant="permanent"
      >
        <List>
          <ListItem>
            <StyledListItemIcon>
              <InboxIcon />
            </StyledListItemIcon>
            <StyledListItemText primary="Inbox" />
          </ListItem>
          <ListItem>
            <StyledListItemIcon>
              <EmailIcon />
            </StyledListItemIcon>
            <StyledListItemText primary="Mail" />
          </ListItem>
        </List>
      </Drawer>
    </DrawerContainer>
  )
}

export default Sidebar



const drawerWidth = 130
const DrawerContainer = styled.div`
  width: ${drawerWidth}px;
`
const StyledListItemIcon = styled(ListItemIcon)`
  /* Add your styles here */
`

const StyledListItemText = styled(ListItemText)`
  /* Add your styles here */
`