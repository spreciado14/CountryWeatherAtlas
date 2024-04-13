import { useState, useEffect, SetStateAction } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import NavbarComponent from '../components/navbar'
import Pagination from '../components/pagination'

function CountryFlag() {
  const [countries, setCountries] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const countriesPerPage = 1
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all?fields=name,flags`)
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error))
  }, [searchParams])
  const searchTerm = searchParams.get('search')
  const filteredCountries = countries.filter(country =>
    country?.name.common.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  )

  // Calculate the index range for the current page
  const indexOfLastCountry = currentPage * countriesPerPage
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  )

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) =>
    setCurrentPage(pageNumber)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchParams({ search: event.target.value })
  }

  return (
    <div>
      <NavbarComponent />
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search for a country"
      />
      <div>
        <Pagination
          currPage={currentPage}
          totalResults={filteredCountries.length}
          resultsPerPage={countriesPerPage}
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
