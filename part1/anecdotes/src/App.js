import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState({selected: 0, points: 0})

  const selectRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const newPoints = [...points]
    newPoints[selected]++
    if (newPoints[selected] > mostVotes.points) {
      setMostVotes({selected: selected, points: newPoints[selected]})
    }
    setPoints(newPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br />
      has {points[selected]} votes<br />
      <button onClick={vote}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes.selected]}<br />
      has {mostVotes.points} votes<br />
    </div>
  )
}

export default App
