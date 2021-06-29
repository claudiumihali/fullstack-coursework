import React from 'react'
import {useSelector} from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div>
      <h2>Anecdotes</h2>
      {(notification) ?
        <Notification />
      :
        <div></div>
      }
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
