import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './routes/home'
import ErrorPage from './error-page'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './routes/login'
import CountryFlags from './routes/countries'
import CountryFlag from './routes/country'
import NavbarComponent from './components/navbar'
import CountryDetails from './routes/countrydetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/full',
    element: <CountryFlags />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/single',
    element: <CountryFlag />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/country/:country',
    element: <CountryDetails />,
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
