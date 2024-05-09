import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavbarComponent from '../components/navbar'
import WeatherInfo from '../components/weatherinfo' // Import WeatherInfo component

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
      <div className="ml-52 mt-5 font-bold ">{country}</div>

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
      <p>Timezone:</p>
      <ul>
        {countryData &&
          countryData.timezones.map((timezone, index) => (
            <li key={index}>{timezone}</li>
          ))}
      </ul>
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
<div className="flex ml-14 mt-10">
  <div className="bg-gray-100 p-3">
    {countryData && <WeatherInfo capitalCity={countryData?.capital} />}
  </div>
</div>
    </>
  )
}

export default CountryDetails
