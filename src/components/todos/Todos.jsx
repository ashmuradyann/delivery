import { useEffect } from 'react'

import Todo from './Todo'

import './todos.scss'

const Todos = ({ todos, setTodos, deleteTodo, toggle, filtered }) => {
    const today = (new Date).toLocaleTimeString(navigator.language, { day: '2-digit', month: '2-digit', year: '2-digit' }).slice(0, -10)

    todos = toggle ? filtered : todos?.filter((el) => {
        console.log(el.created, today)
        return el.created.startsWith(today)
    })

    console.log(todos)
    return (
        <div className="todos">
            {todos?.map(({ id, start, end, deliveryTime, address, number, comment }) => {
                return <Todo
                    key={id}
                    id={id}
                    start={start}
                    end={end}
                    deliveryTime={deliveryTime}
                    address={address}
                    number={number}
                    comment={comment}
                    setTodos={setTodos}
                    deleteTodo={deleteTodo} />
            })}
        </div>
    )
}

export default Todos