import { useState, useEffect, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../components/pagination'

const CountryFlag = () => {
  const [countries, setCountries] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage] = useState(1) // Set the number of countries to display per page

  const totalPages = Math.ceil((countries?.length || 0) / countriesPerPage)

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error))
  }, [])

  // Calculate the index range for the current page
  const indexOfLastCountry = currentPage * countriesPerPage
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  )

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) =>
    setCurrentPage(pageNumber)

  return (
    <div>
      {currentCountries.map((country, index) => (
        <div key={index} style={{ textAlign: 'center' }}>
          <Link
            to={`/country/${country.name.common}`}
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
      <div className="container mt-2">
        <Pagination
          currPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </div>
    </div>
  )
}

export default CountryFlag
