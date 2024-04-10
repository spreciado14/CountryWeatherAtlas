import { useState, useEffect, SetStateAction } from 'react'
import Pagination from '../components/pagination'

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
      {currentCountries[0]?.name.common}
    </div>
  )
}

export default CountryFlag
