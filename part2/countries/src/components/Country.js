import React, {useState, useEffect} from 'react'

import axios from 'axios'

const Country = ({country}) => {
    const [currentWeatherInCapital, setCurrentWeatherInCapital] = useState(undefined)
    useEffect(() => {
        console.log(`GET http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_KEY}&query=${country.capital}`)
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_KEY}&query=${country.capital}`)
            .then(response => {
                console.log(response.data)
                setCurrentWeatherInCapital(response.data.current)
            })
    }, [country])

    return (
        <div>
            <h1>{country.name}</h1>
            <p>
                capital {country.capital}<br />
                population {country.population}
            </p>
            <h2>Spoken languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={`${country.name}'s flag`} />
            <h2>Weather in {country.capital}</h2>
            {
                (currentWeatherInCapital) ?
                    <div>
                        <div><b>temperature:</b> {currentWeatherInCapital.temperature} Celsius</div>
                        <img src={currentWeatherInCapital.weather_icons[0]} alt='weather icon' />
                        <div><b>wind:</b> {currentWeatherInCapital.wind_speed} km/h direction {currentWeatherInCapital.wind_dir}</div>
                    </div>
                :
                    'Loading weather data...'
            }
        </div>
    )
}

export default Country
