import React, {useState, useEffect} from 'react'

import axios from 'axios'

import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [filter, setFilter] = useState('')
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const handleShowCountry = (event) => {
    event.preventDefault()
    setFilter(event.target.name)
  }

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {
        (filteredCountries.length > 10) ?
          'To many matches, specify another filter'
        :
          (filteredCountries.length > 1) ?
            filteredCountries.map(country => 
              <form key={country.name} name={country.name} onSubmit={handleShowCountry}>
                {country.name}
                <button type='submit'>show</button>
              </form>
            )
          :
            (filteredCountries.length === 1) ?
              <Country country={filteredCountries[0]} />
            :
              ''
      }
    </div>
  )
}

export default App
