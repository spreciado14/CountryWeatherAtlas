import React, { useEffect, useState } from 'react'
import { WeatherInfoProps } from '../types/types'

const WeatherInfo: React.FC<WeatherInfoProps> = ({ capitalCity }) => {
  const apiKey = import.meta.env.VITE_WEATHER_KEY
  const [weather, setWeather] = useState<any>(null)
  useEffect(() => {
    const fetchWeather = () => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&units=metric&appid=${apiKey}`
      )
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Failed to fetch weather data')
          }
        })
        .then(data => {
          setWeather(data)
        })
        .catch(error => {
          console.error('Error fetching weather data:', error)
        })
    }

    fetchWeather()
  }, [capitalCity, apiKey])

  if (!weather) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>
        The weather in {capitalCity} right now: {weather.weather[0].description}
      </h3>
      {weather.weather[0].icon !== undefined && (
        <img
          src={
            'http://openweathermap.org/img/wn/' +
            weather.weather[0].icon +
            '@4x.png'
          }
          alt="weather icon"
        />
      )}

      <p>
        Temperature: {weather.main.temp} °C (feels like{' '}
        {weather.main.feels_like} °C)
      </p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <p>Humidity: {weather.main.humidity} %</p>
    </div>
  )
}

export default WeatherInfo
