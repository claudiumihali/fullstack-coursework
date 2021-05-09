import React from 'react'

const Header = (props) => {
  return (
    <h2>{props.name}</h2>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  const parts = []
  props.parts.forEach((part, index) => parts.push(<Part key={index} part={part.name} exercises={part.exercises} />))
  return (
    <div>
      {parts}
    </div>
  )
}

const Total = (props) => {
  const total = props.exercises.reduce((acc, val) => acc + val)
  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(part => part.exercises)} />
    </div>
  )
}

export default Course
