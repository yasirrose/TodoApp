import { Box, Container, Button } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormInput from '../components/FormInput'
import { LoadingButton as _LoadingButton } from '@mui/lab'
import { useLoginUserCheckMutation } from '../store/auth'
import { useGetTodoQuery } from '../store/TodoApi'



interface Input {
  username: string,
  password: string,
}

const LoginPage: React.FC = () => {

const { register, handleSubmit } = useForm<Input>()
const [LoginSucces] = useLoginUserCheckMutation()
const { refetch } = useGetTodoQuery()

const onSubmit = async (data: Input) => {
  await LoginSucces({
    username: data.username,
    password: data.password
  })
  refetch()
}

  return (
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
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
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
            <FormInput name='email' label='Username' type='text' {...register} test-id="email"/>
            <FormInput name='password' label='Password' type='password' {...register}/>
            <Button variant="contained" type="submit"> Add </Button>
          </Box>
      </Box>
    </Container>
  )
}

export default LoginPage

