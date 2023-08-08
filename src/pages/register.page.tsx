import { Box, Container, Typography, Button } from '@mui/material'
import { LoadingButton as _LoadingButton } from '@mui/lab'
import { TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRegisterUserMutation } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import Notification from '../components/Notification'
import { useState } from 'react'


interface SignupType {
  username: string,
  email: string,
  password: string
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupType>()
  const [registerUser] = useRegisterUserMutation()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)


  const onSubmit: SubmitHandler<SignupType> = async (data) => {
    try {
      const response = await registerUser(data)
      if ('data' in response) { navigate('/')} 
      else { setShow(true) }
    } catch (error) { setShow(true) }
  }

  return (
    <>
      {show &&
        <Notification message='username already taken.' />
      }
      <Container
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
          }}
        >
          <Typography
            textAlign='center'
            component='h1'
            sx={{
              color: '#f9d13e',
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 600,
              mb: 2,
              letterSpacing: 1,
            }}
          >
            Welcome to Todos App!
          </Typography>
          <Typography component='h2' sx={{ color: '#e5e7eb', mb: 2 }}>
            Sign Up To Get Started!
          </Typography>
          <Box
            component='form'
            onSubmit={() => { }}
            noValidate
            autoComplete='off'
            maxWidth='27rem'
            width='100%'
            sx={{
              backgroundColor: '#e5e7eb',
              p: { xs: '1rem', sm: '2rem' },
              borderRadius: 2,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                style={{ margin: '4px' }}
                id="username"
                label="username"
                {...register('username', { required: true, maxLength: 20, minLength: 4 })}
              />
              {errors.username?.type === 'required' && <span>username is required.</span>}
              {errors.username?.type === 'minLength' && <span>At Least enter 4 characters.</span>}
              {errors.username?.type === 'maxLength' && <span>Character should be less than 20.</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                style={{ margin: '4px' }}
                id="email"
                label="email"
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter valid email."
                  }
                })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                style={{ margin: '4px' }}
                id="password"
                label="password"
                {...register('password', {
                  required: true,
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                    message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                  }
                })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
          </Box>
          <Button variant="contained" type="submit" style={{ backgroundColor: 'green', marginTop: '4px' }}>SignUp</Button>
        </Box>
      </Container>
    </>
  )
}

export default RegisterPage
