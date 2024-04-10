import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // Assuming you're using React Router for navigation
import NavbarComponent from '../components/navbar'

const CountryFlags = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error))
  }, [])

  return (
    <div>
      <NavbarComponent />
      {countries.length > 0 && (
        <div
          style={{
            margin: '5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            gap: '130px',
          }}>
          {countries.map((country, index) => (
            <div key={index} style={{ display: 'flex', textAlign: 'left' }}>
              <Link
                to={`/country/${country.name.common}`} // Assuming you have a route to display country details
                style={{
                  textDecoration: 'underline',
                  color: 'blue',
                  cursor: 'pointer',
                }}>
                <img
                  src={country?.flags.png}
                  alt={country?.name.common}
                  width="100"
                  height="auto"
                />
                <p>{country?.name.common}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CountryFlags
