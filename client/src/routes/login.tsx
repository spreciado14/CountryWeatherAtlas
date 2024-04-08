import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import '../App.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const handleResponse = (res: CredentialResponse) => {
    console.log(res)
    navigate('/')
  }

  return (
    <>
      <h1>Login</h1>
      <GoogleLogin onSuccess={handleResponse}></GoogleLogin>
    </>
  )
}

export default Login
