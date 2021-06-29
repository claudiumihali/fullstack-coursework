import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import {createNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const voteAnecdote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(createNotification(`you voted '${anecdote.content}'`))
        setTimeout(() => dispatch(createNotification('')), 5000)
    }

    return (
        <div>
            {anecdotes.sort((a1, a2) => a2.votes - a1.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
