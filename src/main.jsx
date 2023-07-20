import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><App /></PrivateRoute>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register />
  },
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
