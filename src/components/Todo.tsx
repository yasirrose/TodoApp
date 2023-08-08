import { useForm, SubmitHandler } from 'react-hook-form'
import { usePostTodoMutation } from '../store/TodoApi'
import {
  TextField, Button, Box,
  Select, MenuItem, InputLabel,
  Switch, Slider, FormControlLabel,
  Autocomplete
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Container } from '@mui/material'
import { SetStateAction } from 'react'

interface Input {
  title: string;
  category: string;
  isDone: boolean;
  sliderValue: string;
  autocompleteValue: string;
  toggleButtonValue: string;
}

const RootContainer = styled(Container)({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export interface PropTypes {
  setShow: React.Dispatch<SetStateAction<boolean>>
}

function MyTodo({ setShow }: PropTypes) {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Input>()
  const [postTodoMutation] = usePostTodoMutation()

  const onSubmit = async (data: Input) => {
    await postTodoMutation({
      title: data.title,
      category: data.category,
      done: data.isDone,
      priority: data.sliderValue,
      purpose: data.autocompleteValue
    })
    reset()
    setShow(false)
  }

  return (
    <>
      <RootContainer style={{ backgroundColor: 'white' }}>
        <div style={{ border: '2px solid grey', borderRadius: "10px", padding: "20px" }}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                error={!!errors.title}
                helperText={errors.title ? 'Title is required' : ''}
                id="title"
                label="Enter todo task"
                {...register('title', {
                  required: true,
                  minLength: 4,
                  maxLength: 30,
                })}
              />
              {errors?.title?.type === 'minLength' && <span>Enter at least 4 characters.</span>}
              {errors?.title?.type === 'maxLength' && <span>Enter characters less than 30.</span>}
            </div>
            <div>
              <label>Select Priority from 1 to 100</label>
              <Slider
                id="slider"
                {...register('sliderValue')}
                defaultValue={0}
                step={1}
                min={0}
                max={100}
              />
            </div>

            <div>
              <Autocomplete
                id="autocomplete"
                options={['Personal', 'Working', 'Shopping']}
                renderInput={(params) => <TextField {...params} label="Select Purpose" />}
                onChange={(_, value) => setValue('autocompleteValue', value || '')}
              />
            </div>
            <div>
              <InputLabel id="category-label">Select Category</InputLabel>
              <Select
                label="SElect Category"
                id="category"
                defaultValue='Personal'
                {...register('category', { required: true })}
              >
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="shopping">Shopping</MenuItem>
              </Select>
              <FormControlLabel
                control={<Switch {...register('isDone')} />}
                label="Is Done"
                style={{ marginLeft: "5px" }}
              />
            </div>
            <Button variant="contained" type="submit" style={{ marginLeft: '4px', marginTop: '10px' }}>Add</Button>
            <Button variant="contained" onClick={() => setShow(false)} style={{ marginLeft: '4px', marginTop: '10px' }}>Close</Button>
            <div>
            </div>
          </Box>
        </div>
      </RootContainer>
    </>
  )
}

export default MyTodo
