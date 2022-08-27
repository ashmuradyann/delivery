import Todo from './Todo'
import './todos.scss'

const Todos = ({ todos, setTodos, deleteTodo }) => {
    return (
        <div className="todos">
            {todos.map(({ id, start, end, deliveryTime, address, number, comment }) => {
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