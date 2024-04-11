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

  console.log(countryData)
  return (
    <>
      <NavbarComponent />
      <div className="mt-10 ml-20 flex">
        <img src={countryData?.flags.png} alt={countryData?.name.common} />

        <div className="ml-20 flex justify-center">
          <div className="bg-gray-100 p-5">Capital: {countryData?.capital}</div>
          <div className="bg-gray-100 p-5 m">
            <p>Languages:</p>
            <ul>
              {countryData &&
                Object.keys(countryData.languages).map(key => (
                  <li key={key}>{countryData.languages[key]}</li>
                ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-5">
            Population: {countryData?.population}
          </div>
          <div className="bg-gray-100 p-5">
            Timezone:{' '}
            {countryData &&
              Object.keys(countryData.timezones).map(key => (
                <li key={key}>{countryData.timezones[key]}</li>
              ))}
          </div>
          <div className="bg-gray-100 p-5">
            <p>Maps:</p>
            <ul>
              <li>
                <a href={countryData?.maps['googleMaps']}>Google Maps</a>
              </li>
              <li>
                <a href={countryData?.maps['openStreetMaps']}>OpenStreetMap</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default CountryDetails
