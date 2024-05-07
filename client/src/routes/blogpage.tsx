import { useEffect, useState } from 'react'
import NavbarComponent from '../components/navbar'
import { FooterComponent } from '../components/footer'
import { DrawerComponent } from '../components/drawer'
import { CardComponent } from '../components/card'

function Home() {
  const [data, setData] = useState([])

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavbarComponent />
        <main className="flex-grow"></main>
        <CardComponent />
        <DrawerComponent />
        <FooterComponent />
      </div>
    </>
  )
}

export default Home
