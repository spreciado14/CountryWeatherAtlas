import { useEffect, useState } from 'react'
import NavbarComponent from '../components/navbar'
import { useParams } from 'react-router-dom'

function CountryDetails() {
  const [countryData, setCountry] = useState(null)
  const { country } = useParams()

  useEffect(() => {
    fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response => response.json())
      .then(data => setCountry(data))
      .catch(error => console.error('Error fetching countries:', error))
  }, [])
  return (
    <>
      <NavbarComponent />
      <div className="mt-10 flex justify-center">
        <img src={countryData?.flags.png} alt={countryData?.name.common} />
      </div>
    </>
  )
}

export default CountryDetails
