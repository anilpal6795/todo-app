import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { TodoHome } from './TodoHome'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoHome />,
  },
  {
    path: '*',
    element: <TodoHome />,
  },
])

const Routes = () => {
  return <RouterProvider router={router} />
}

export { Routes }
