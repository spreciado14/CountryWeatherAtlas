import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import NavbarComponent from '../components/navbar'

function Login() {
  const navigate = useNavigate()
  const handleResponse = (res: CredentialResponse) => {
    console.log(res)
    navigate('/')
  }

  return (
    <>
      <NavbarComponent />
      <h1>Login</h1>
      <GoogleLogin onSuccess={handleResponse}></GoogleLogin>
    </>
  )
}

export default Login
