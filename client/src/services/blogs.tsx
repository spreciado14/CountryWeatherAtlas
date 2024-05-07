/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (page: number = 1) => {
  const response = await axios.get(`${baseUrl}?page=${page}`)
  return response.data
}

const create = async (newObject: any) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id: any, newObject: any) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id: any) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, update, remove }
