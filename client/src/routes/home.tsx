import { useEffect, useState } from 'react'
import NavbarComponent from '../components/navbar'

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
      <NavbarComponent />
    </>
  )
}

export default Home
