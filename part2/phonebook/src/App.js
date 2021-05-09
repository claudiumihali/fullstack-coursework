import './App.css'

import React, {useState, useEffect} from 'react'

import * as personsService from './services/Persons'

import Filter from './components/Filter'
import AddNewPerson from './components/AddNewPerson'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [notification, setNotification] = useState('')
  const [error, setError] = useState('')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll().then((persons) => {setPersons(persons)})
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddNewPerson = () => {
    const newPerson = {name: newName, number: newNumber}
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService.update(existingPerson.id, newPerson).then((updatedPerson) => {
          setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
          setNewName('')
          setNewNumber('')
          setNotification(`Updated the number of ${newPerson.name}`)
          setTimeout(() => setNotification(''), 5000)
        })
      }
    } else {
      personsService.create(newPerson).then((newPerson) => {
        setPersons([...persons, newPerson])
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${newPerson.name}`)
        setTimeout(() => setNotification(''), 5000)
      })
    }
  }

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.deleteById(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      }).catch(() => {
        setError(`Information on ${person.name} has already been removed from the server`)
        setTimeout(() => setError(''), 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter value={filter} onChange={handleFilterChange} />
      <AddNewPerson newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange}
        handleAddNewPerson={handleAddNewPerson} />
      <Numbers filter={filter} persons={persons} onDelete={handleDeletePerson} />
    </div>
  )
}

export default App
