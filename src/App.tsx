import TodoTable from "./components/TodoTable"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { LoginCheck } from './loginCheck'
import NavBar from './components/NavBar'
import RegisterPage from './pages/register.page'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginCheck children={
      <>
        <NavBar />
        <TodoTable />
      </>
    } />
  },
  {
    path: '/success',
    element: <LoginCheck children={
      <>
        <NavBar />
        <TodoTable />
      </>
    } />
  },

  {
    path: '/signup',
    element: <RegisterPage />
  }

])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>

  )
}

export default App