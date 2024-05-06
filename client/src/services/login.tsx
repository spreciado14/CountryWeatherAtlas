/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
const baseUrl = '/api/login'

const login = async (newObject: any) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { login }
