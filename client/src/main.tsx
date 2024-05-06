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
import { PrivateRoute } from './utils/PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
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
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
)
