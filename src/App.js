import { useState, useEffect } from 'react'

import Form from './components/form/Form'
import Todos from './components/todos/Todos'

import './App.scss'

const LOCAL_STORAGE_KEY = 'delivery'

const App = () => {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const deleteTodo = (id) => {
    setTodos(todos.filter(el => id != el.id))
  }

  return (
    <div className="main">
      <Form todos={todos} setTodos={setTodos} />
      <Todos todos={todos} deleteTodo={deleteTodo} setTodos={setTodos} />
    </div>
  )
}

export default App
