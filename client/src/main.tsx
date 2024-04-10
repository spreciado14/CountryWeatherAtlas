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
    path: '/fullview',
    element: <CountryFlags />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/singleview',
    element: <CountryFlag />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/navbar',
    element: <NavbarComponent />,
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
