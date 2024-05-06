import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'universal-cookie'
import loginService from '../services/login'
import { PayloadDecoder } from '../types/types'
import { useUser } from '../stores/userContext'

function Login() {
  const { setName, setEmail, setPicture } = useUser()

  const navigate = useNavigate()
  const cookies = new Cookies()
  const handleResponse = async (res: CredentialResponse) => {
    cookies.set('token', JSON.stringify(res.credential), {
      maxAge: 3600,
    })

    const jwt = JSON.stringify(res.credential)
    const decoder = jwtDecode<PayloadDecoder>(jwt) // Returns with the JwtPayload type
    await loginService.login(decoder)
    setName(decoder.name)
    setEmail(decoder.email)
    setPicture(decoder.picture)
    navigate('/')
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-20 rounded-md shadow-md">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="flex justify-center text-xl font-bold mb-4">
            Login or Create an Account
          </h2>
          <p className="flex justify-center text-gray-400">Login to google.</p>
          <p className="flex justify-center text-gray-400 mb-5">
            Your website is saved locally in the browser.
          </p>
          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleResponse} />
          </div>
          <p className="text-gray-600 text-sm mt-5">
            By continuing, you are indicating that you accept our Terms of
            Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
