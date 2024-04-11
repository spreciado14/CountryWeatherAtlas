import { Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const cookies = new Cookies()
  const token: string = cookies.get('token') as string

  return token ? <>{children}</> : <Navigate to="/login" />
}
