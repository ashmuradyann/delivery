import { useState, useEffect } from 'react'

import Form from './components/form/Form'
import Todos from './components/todos/Todos'

import './App.scss'

const LOCAL_STORAGE_KEY = 'delivery'

const App = () => {

  const [todos, setTodos] = useState([])
  const [filtered, setFiltered] = useState([])
  const [toggle, setToggle] = useState(false)
  const [editCardId, setEditCardId] = useState(null)

  console.log(editCardId)

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) {
      setTodos(storedTodos)
      setFiltered(storedTodos)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    setFiltered(todos)
  }, [todos])

  const deleteTodo = (id) => {
    setTodos(todos.filter(el => id !== el.id))
  }

  return (
    <div className="main">
      <Form
        todos={todos}
        setTodos={setTodos}
        toggle={toggle}
        setToggle={setToggle}
        filtered={filtered}
        setFiltered={setFiltered}
        editCardId={editCardId}
        setEditCardId={setEditCardId} />
      <Todos
        todos={toggle ? filtered : todos}
        setTodos={setTodos}
        filtered={filtered} toggle={toggle}
        deleteTodo={deleteTodo}
        setEditCardId={setEditCardId} />
    </div>
  )
}

export default App
