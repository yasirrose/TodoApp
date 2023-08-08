import { Box, Container, Button, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoadingButton as _LoadingButton } from '@mui/lab'
import { useLoginUserCheckMutation } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Notification from './Notification'
import { useLocation } from 'react-router-dom';

type Input = {
  username: string;
  password: string;
  access: string;
  refresh: string;
}

const Login: React.FC = () => {
  const [notification, setNotification] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<Input>()
  const [LoginSucces] = useLoginUserCheckMutation()
  const navigate = useNavigate()
  const location = useLocation()


  const OnClickUser = () => {
    navigate('/signup')
  }



  const onSubmit: SubmitHandler<Input> = async (data) => {
    const loginData: Input = {
      username: data.username,
      password: data.password,
      access: '',
      refresh: '',
    }
    const response = await LoginSucces(loginData)
    if ('data' in response) {
      if (response.data === true) { location.pathname === '/success' ? navigate('/') : navigate('/success') }
    }
    else { setNotification(true) }
  }

  return (
    <>
      {notification &&
        <Notification message="Given Credentials are not valid, Please Try again." />
      }
      <Container
       data-testid='loginformtestid'
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#2363eb',
        }}
      >
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '5px'
          }}
        >
            <TextField
              helperText={errors ? 'Title is required' : ''}
              id="title"
              label="Username"
              data-testid="username"
              {...register('username', { required: true })}
            />
            <TextField
              helperText={errors ? 'Title is required' : ''}
              id="password"
              label="Password"
              {...register('password', { required: true })}
            />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button style={{ backgroundColor: 'green', margin: '2px' }} variant="contained" type="submit"> Login </Button>
            <Button onClick={OnClickUser} style={{ backgroundColor: 'green', margin: '2px' }} variant="contained" type="submit"> Create New account </Button>
          </div>
        </Box>
      </Container>
    </>
  )
}

export default Login

