import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Logout } from '../store/logInOut'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const NavigationBar: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
  const handleLogout = () => {
    Logout()
    location.pathname === '/success' ? navigate('/') : navigate('/success')
  }

   
  return (
    <AppBar position="static" style={{marginLeft: '120px', marginRight: 0, width: '93%'}}>
      <Toolbar>
        <Typography variant="h6">Todos App</Typography>
        <div style={{ marginLeft: 'auto' }}>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavigationBar
