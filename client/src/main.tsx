import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './routes/home'
import ErrorPage from './error-page'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './routes/login'
import CountryFlag from './routes/country'
import CountryDetails from './routes/countrydetails'
import Blog from './routes/blogpage'
import { PrivateRoute } from './utils/PrivateRoute'
import { UserProvider } from './stores/userContext'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/single',
    element: (
      <PrivateRoute>
        <CountryFlag />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/blogs',
    element: (
      <PrivateRoute>
        <Blog />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/country/:country',
    element: (
      <PrivateRoute>
        <CountryDetails />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
