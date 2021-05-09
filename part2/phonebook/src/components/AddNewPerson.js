import React from 'react'

const AddNewPerson = ({newName, handleNewNameChange, newNumber, handleNewNumberChange, handleAddNewPerson}) => {
    return (
        <div>
            <h2>add a new</h2>
            <div>name: <input value={newName} onChange={handleNewNameChange} /></div>
            <div>number: <input value={newNumber} onChange={handleNewNumberChange} /></div>
            <div><button onClick={handleAddNewPerson}>add</button></div>
        </div>
    )
}

export default AddNewPerson
