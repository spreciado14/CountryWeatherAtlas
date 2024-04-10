import { useState, useEffect, SetStateAction } from 'react'
import Pagination from '../components/pagination'
import NavbarComponent from '../components/navbar'
import { Link } from 'react-router-dom'

const CountryFlag = () => {
  const [countries, setCountries] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage] = useState(1)

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
      <NavbarComponent />
      <div>
        <Pagination
          currPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          countryFlag={
            <img
              src={currentCountries[0]?.flags.png}
              alt={currentCountries[0]?.name.common}
            />
          }
        />
      </div>

      <div className="flex flex-1 justify-center">
        <Link
          to={`/country/${currentCountries[0]?.name.common}`} // Assuming you have a route to display country details
          style={{
            textDecoration: 'underline',
            color: 'blue',
            cursor: 'pointer',
          }}>
          {currentCountries[0]?.name.common}
        </Link>
      </div>
    </div>
  )
}

export default CountryFlag
