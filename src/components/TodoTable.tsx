import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Sidebar from './Drawer';
import { useGetTodoQuery, useUpdateTodoMutation, useDeleteTodoMutation } from '../store/TodoApi';
import Grid from '@mui/material/Grid'
import MyModal from './Modal';
import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  done: boolean;
  category: string;
  priority: string;
  purpose: string;
}

export default function TodoTable() {
  const { data, error, isLoading } = useGetTodoQuery()
  const [updateTodoMutation] = useUpdateTodoMutation()
  const [deleteTodoMutation] = useDeleteTodoMutation()
  const [modal, setModal] = useState(false)

  const handleUpdateTodo = async (id: number, done: boolean) => {
    await updateTodoMutation({ id, done: !done })
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation(id)
  }

  if (isLoading || error) {
    return <div data-testid='todotabletestid'>Loading data.....</div>
  }

  return (
    <Grid container>
      <div data-testid='todotabletestid'>
      <Grid item>
        <Sidebar />
      </Grid>
      </div>
      <Grid item sx={{ flex: 1 }}>
        <h1>Your Todos are here.</h1>
        <Button variant="contained" onClick={() => setModal(true)}>Add Todo</Button>
        <TableContainer component={Paper}>
          <MyModal show={modal} setShow={setModal}/>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Purpose</TableCell>
                <TableCell align="left">Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) &&
                data.map((todo: Todo) => (
                  <TableRow key={todo.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {todo.title}
                    </TableCell>
                    <TableCell align="right">{todo.done ? 'Completed' : 'Not Completed'}</TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="error" onClick={() => handleDeleteTodo(todo.id)}>
                        Delete
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => handleUpdateTodo(todo.id, todo.done)}>
                        Toggle
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {todo?.category?.length > 0 ? todo.category : '-'}
                      
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {todo?.purpose?.length > 0 ? todo.purpose: '-'}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {todo?.priority?.length > 0 ? todo.priority : '-'}
                      
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
