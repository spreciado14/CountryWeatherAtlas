import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarComponent from '../components/navbar';
import WeatherInfo from '../components/weatherinfo'; // Import WeatherInfo component

function CountryDetails() {
  const [countryData, setCountry] = useState(null);
  const { country } = useParams();

  useEffect(() => {
    fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response => response.json())
      .then(data => setCountry(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, [country]);

  return (
    <>
      <NavbarComponent />
      
      {countryData && (
        <div className="container mx-auto mt-10">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="w-full md:w-2/5">
              <img 
                src={countryData.flags.png} 
                alt={countryData.name.common} 
                className="w-full border-0"
              />
            </div>
            <div className="w-full md:w-2/5 mt-5 md:mt-0 md:ml-5">
              <div>
                <h1 className="text-4xl font-semibold mb-4">{country}</h1>
                <div className="p-5">
                  <p className="mb-2"><span className="font-semibold">Capital:</span> {countryData.capital}</p>
                  <p className="mb-2"><span className="font-semibold">Languages:</span></p>
                  <ul>
                    {Object.keys(countryData.languages).map(key => (
                      <li key={key}>{countryData.languages[key]}</li>
                    ))}
                  </ul>
                  <p className="mt-4"><span className="font-semibold">Population:</span> {countryData.population}</p>
                  <p className="mt-4"><span className="font-semibold">Timezones:</span></p>
                  <ul>
                    {countryData.timezones.map((timezone, index) => (
                      <li key={index}>{timezone}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 mt-8 md:mt-0 md:ml-5">
              <div className="p-5">
                <h2 className="text-2xl font-semibold mb-4">Maps:</h2>
                <ul>
                  <li><a href={countryData.maps['googleMaps']} className="text-blue-500">Google Maps</a></li>
                  <li><a href={countryData.maps['openStreetMaps']} className="text-blue-500">OpenStreetMap</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Border Countries:</h2>
            <div className="flex flex-wrap justify-center">
              {countryData.borders.map((borderCountry, index) => (
                <div key={index} className="bg-gray-200 p-3 mr-2 mb-2 rounded-lg">
                  {borderCountry}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 md:mt-12">
            <WeatherInfo capitalCity={countryData.capital} />
          </div>
        </div>
      )}
    </>
  );
}

export default CountryDetails;
