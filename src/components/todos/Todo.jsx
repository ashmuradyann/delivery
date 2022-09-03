
const Todo = ({ id, start, end, deliveryTime, address, number, comment, setTodos, deleteTodo, setEditCardId }) => {

    const getTime = (id, type) => {
        const date = (new Date).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' })
        setTodos(todos => todos.map(el => {
            if (el.id === id) {
                return {
                    id: el.id,
                    created: el.created,
                    start: type === "START" ? date : el.start,
                    end: type === "END" ? date : el.end,
                    deliveryTime: el.deliveryTime,
                    address: el.address,
                    number: el.number,
                    comment: el.comment
                }
            }
            return el
        }))
    }

    return <div className="todo">
        <div className="todo-header">
            <div>
                <p>Время доставки: {deliveryTime.endsWith(":") ? deliveryTime.slice(0, -1) : deliveryTime}</p>
                <div>
                    {start && <p className="started">Начало: {start}</p>}
                    {end && <p className="ended">Завершён: {end}</p>}
                </div>
                <p>Адрес: {address}</p>
                <p>Телефон: <a href={"tel:" + number}>{number}</a></p>
                <p>Комментария: {comment}</p>
            </div>
            <div>
                {/* <img src="https://img.icons8.com/ios-glyphs/30/ff0000/filled-trash.svg" alt="delte-logo" /> */}
                <button className="deleteBtn" onClick={() => deleteTodo(id)}>Удалить</button>
                <button className="editBtn" onClick={() => setEditCardId(id)}>Изменить</button>
            </div>
        </div>
        <div className="buttons">
            <button onClick={() => navigator.clipboard.writeText(address)}>Адрес</button>
            <button onClick={() => getTime(id, "START")}>Начало</button>
            <button onClick={() => getTime(id, "END")}>Завершение</button>
        </div>
    </div>
}

export default Todo