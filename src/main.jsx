import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './Pages/Aboutpage.jsx';
import Contact from './Pages/ContactPage.jsx';
import Login from './Forms/LoginPage.jsx';
import Register from './Forms/RegisterPage.jsx';
import AdminDashboard from './Pages/AdminRelatedPages/AdminDashboard.jsx';
import Queries from './Pages/AdminRelatedPages/Queries.jsx';
import Products from './Pages/Products.jsx';
import UpdateProducts from './Pages/AdminRelatedPages/UpdateProducts.jsx';
import AddProducts from './Pages/AdminRelatedPages/AddProducts.jsx';
// import Settings from './Pages/AdminRelatedPages/Settings.jsx';
import Orders from './Pages/AdminRelatedPages/Orders.jsx';
import MyCart from './Pages/UserRelatedPages/MyCart.jsx';
import ProtectedRoute from './Components/ProtectedRoutes.jsx';
import ViewProducts from './Pages/UserRelatedPages/ViewProducts.jsx';
import UserDashboard from './Pages/UserRelatedPages/Userdashboard.jsx';
import Terms from './Pages/Terms.jsx';
import Profile from './Pages/UserRelatedPages/Profile.jsx';


const router = createBrowserRouter([
  { 
    path: '/',
    element: <App />
  },{
    path:'/about',
    element:<About/>
  },{
    path:'/contact',
    element:<Contact/>
  },{
    path:'/login',
    element:<Login/>
  },{
    path:'/register',
    element:<Register/>
  },{
    path: '/admin/dashboard',
    element:
        <ProtectedRoute allowedRole="ADMIN">
            <AdminDashboard />
        </ProtectedRoute>
  },{
    path:'/admin/queries',
    element:<ProtectedRoute allowedRole="ADMIN">
              <Queries/>
             </ProtectedRoute>
  },{
    path:'/products',
    element:<Products/>
  },{
    path:'/products/category/:category',
    element:<Products/>
  },{
    path:'/admin/products',
    element:<ProtectedRoute allowedRole="ADMIN">
            <UpdateProducts/>
        </ProtectedRoute>
  },{
    path:'/admin/addproducts',
    element:<ProtectedRoute allowedRole="ADMIN">
            <AddProducts/>
        </ProtectedRoute>
  },{
    path:'/admin/editproduct/:id',
    element:<ProtectedRoute allowedRole="ADMIN">
            <AddProducts/>
        </ProtectedRoute>
  },{
    path:'/user/dashboard',
    element:<ProtectedRoute allowedRole="USER">
            <UserDashboard/>
        </ProtectedRoute>
  },{
    path:'/user/products',
    element: <ProtectedRoute allowedRole="USER">
            <ViewProducts/>
        </ProtectedRoute>
  },{
    path: "/user/cart",
    element: (
        <ProtectedRoute allowedRole="USER">
            <MyCart />
        </ProtectedRoute>
    )
},{
  path:'/admin/orders',
  element:<Orders/>
},{
  path:'/terms',
  element:<Terms/>
},{
  path:'/user/profile',
  element:<Profile/>
},{
  path:'/admin/profile',
  element:<Profile/>
}
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
