import React from 'react'
import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {createNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const newAnecdote = event.target.newAnecdote.value
        dispatch(createAnecdote(newAnecdote))
        event.target.newAnecdote.value = ''
        dispatch(createNotification(`you created a new anecdote: '${newAnecdote}'`))
        setTimeout(() => dispatch(createNotification('')), 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name='newAnecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
