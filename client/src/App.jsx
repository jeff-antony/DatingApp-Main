import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { HomeLayout,Register,Login, Landing, DashboardLayout,ChatLayout,EditProfilePage,EmployeeStatus, 
  RelationshipStatus,ProfilePage
} from './pages'



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
        path:'/register/:userId',
        element:<Register/>
        // path:'/register',
        // element:<Register/>
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
        path:'/employeeStatus/:userId',
        element:<EmployeeStatus/>
      },
      {
        path:'/relationshipStatus/:userId',
        element:<RelationshipStatus/>
      },
      {
        path:'/chats',
        element:<ChatLayout/>
      },
      {
        path:'/profile',
        element:<ProfilePage/>
      },
      {
        path:'/edit-profile',
        element:<EditProfilePage/>
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
