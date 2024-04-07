import { useEffect, useState } from 'react'
import '../App.css'

function Home() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setData(data.user)
      })
  }, [])

  return (
    <>
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
