import { useEffect, useState } from 'react'
import NavbarComponent from '../components/navbar'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [data, setData] = useState([])
  const cookies = new Cookies()
  const navigate = useNavigate()

  useEffect(() => {
    const token: string = cookies.get('token') as string
    if (!token) {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setData(data.user)
      })
  }, [])

  return (
    <>
      <NavbarComponent />
      {data.map(user => (
        <div key={user.id}>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </>
  )
}

export default Home
