import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { HomeLayout,Register,Login, Landing, DashboardLayout,ChatLayout,ProfilePage } from './pages'



const router = createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    // errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/dashboard',
        element:<DashboardLayout/>
      },
      {
        path:'/chats',
        element:<ChatLayout/>
      },
      {
        path:'/edit-profile',
        element:<ProfilePage/>
      }
    ]
  },
 
  
  
])

const App =() => {
  return (
    <>
      <RouterProvider router={router}/>

    </>
  )
}
export default App
