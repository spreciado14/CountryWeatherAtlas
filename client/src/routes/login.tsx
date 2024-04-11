import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const handleResponse = (res: CredentialResponse) => {
    console.log(res)
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
