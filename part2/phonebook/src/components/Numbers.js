import React from 'react'
import Person from './Person'

const Numbers = ({filter, persons, onDelete}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {
                (filter === '') ?
                    persons.map(person => <Person key={person.id} name={person.name} number={person.number} onDelete={() => onDelete(person)} />)
                :
                    persons
                        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                        .map(person => <Person key={person.id} name={person.name} number={person.number} onDelete={() => onDelete(person)} />)
            }
        </div>
    )
}

export default Numbers
