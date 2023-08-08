import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import React from 'react'

const Notification: React.FC<Props> = ({ message }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{ message }</Alert>
    </Stack>
  )
}
export default Notification

type Props =  {
    message: string;
}