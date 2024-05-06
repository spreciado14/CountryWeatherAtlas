import { useEffect, useState } from 'react'
import NavbarComponent from '../components/navbar'
import { FooterComponent } from '../components/footer'
import { DrawerComponent } from '../components/drawer'

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
      <div className="flex flex-col min-h-screen">
        <NavbarComponent />
        <main className="flex-grow"></main>
        <DrawerComponent />
        <FooterComponent />
      </div>
    </>
  )
}

export default Home
