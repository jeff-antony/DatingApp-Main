import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { HomeLayout,Register,Login, Landing, DashboardLayout,ChatLayout,EditProfilePage,EmployeeStatus, 
  RelationshipStatus,ProfilePage,Notification,
  ChooseLayout,EcommerceHomePage,AdminDashboard,AdminEcommerce,CartPage,Shortlisted,EditMyProfile,ChangePassword,PrivacySettings,Filter
} from './pages'
import { ProtectedRoute } from './components'
import GlobalStyle from './globalStyles'


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
        path:'/chooseLayout',
        element: (
          <ProtectedRoute>
            <ChooseLayout/>
          </ProtectedRoute>
          
        )
      },
      {
        path:'/adminDashboard',
        element: (
          <ProtectedRoute>
            <AdminDashboard/>
          </ProtectedRoute>
          
        )
      },
      {
        path:'/adminEcommerce',
        element: (
          <ProtectedRoute>
            <AdminEcommerce/>
          </ProtectedRoute>
          
        )
      },
      {
        path:'/e-commerceHomePage',
        element: (
          <ProtectedRoute>
            <EcommerceHomePage/>
          </ProtectedRoute>
          
        )
      },
      {
        path:'/cart/:userId',
        element: (
          <ProtectedRoute>
            <CartPage/>
          </ProtectedRoute>
          
        )
      },
      {
        path:'/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardLayout/>
          </ProtectedRoute>
          
        )
      },
      {
        path:'/notifications/:userId',
        element: (
          // <ProtectedRoute>
            <Notification/>
          // </ProtectedRoute>
          
        )
      },
      {
        path:'/employeeStatus/:userId',
        element:(
          <ProtectedRoute>
            <EmployeeStatus/>
          </ProtectedRoute>
        )
      },
      {
        path:'/relationshipStatus/:userId',
        element:(
          <ProtectedRoute>
            <RelationshipStatus/>
          </ProtectedRoute>
        )
      },
      {
        path:'/chats/:userId',
        element:(
          // <ProtectedRoute>
            <ChatLayout/>
          // </ProtectedRoute>
        )
      },
      {
        path:'/profile/:id',
        element:(
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        )
      },
      {
        path:'/edit-profile/:userId',
        element:(
          <ProtectedRoute>
            <EditProfilePage/>
          </ProtectedRoute>
        )
      },
      {
        path:'/edit-my-profile',
        element:(
          <ProtectedRoute>
            <EditMyProfile/>
          </ProtectedRoute>
        )
      },
      {
        path:'/change-password',
        element:(
          <ProtectedRoute>
            <ChangePassword/>
          </ProtectedRoute>
        )
      },
      {
        path:'/filter',
        element:(
          <ProtectedRoute>
            <Filter/>
          </ProtectedRoute>
        )
      },
      {
        path:'/privacy-settings',
        element:(
          <ProtectedRoute>
            <PrivacySettings/>
          </ProtectedRoute>
        )
      },
      
      {
        path:'/shortlisted',
        element: (
          <ProtectedRoute>
             <GlobalStyle />
            <Shortlisted/>
          </ProtectedRoute>
          
        )
      },
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
