import { useState, useEffect } from 'react'

import { FormInputLabel, TextareaLabel, Input, Textarea, Group } from './Input.jsx'

import './form.scss'

const LOCAL_STORAGE_KEY = 'formValues'

const Form = ({ todos, setTodos, toggle, setToggle, setFiltered, editCardId, setEditCardId }) => {

    const [filterValue, setFilterValue] = useState("")
    const [forms, setForms] = useState({
        deliveryTime: "",
        address: "",
        number: "",
        comment: ""
    })

    useEffect(() => {
        const formValues = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        formValues && setForms(formValues)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms))
    }, [forms])

    useEffect(() => {
        if (editCardId) {
            todos.map(({ id, deliveryTime, address, number, comment }, i) => {
                if (editCardId === id) {
                    setForms({
                        deliveryTime: deliveryTime,
                        address: address,
                        number: number,
                        comment: comment
                    })
                }
            })
        }
    }, [editCardId])


    const handleFilter = (e) => {
        setFilterValue(e.target.value)
        setFiltered(todos.filter(el => el.created.startsWith(e.target.value)))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "deliveryTime") {
            setForms({ ...forms, [name]: value.length <= 4 ? value.replace(/[^+\d]/g, '').replace(/.{2}/g, '$&:') : value.replace(/[^+\d]/g, '').replace(/.{2}/g, '$&:').slice(0, -1) })
        } else {
            setForms({ ...forms, [name]: value })
        }
    }

    const phoneNumberHandleChange = (e) => {
        if (e.target.value.length !== 13) {
            setForms({ ...forms, number: "+7" + e.target.value.replaceAll("+7", "").replace(/[^+\d]/g, '') })
        }
        if (e.target.value === "+7") setForms({ ...forms, number: "" })
    }

    const resetForms = () => {
        setForms({
            deliveryTime: "",
            address: "",
            number: "",
            comment: ""
        })
        editCardId && setEditCardId(null)
    }

    const submit = () => {
        setTodos([
            {
                id: Math.random(),
                created: (new Date).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' }),
                start: "",
                end: "",
                deliveryTime: forms.deliveryTime,
                address: forms.address,
                number: forms.number,
                comment: forms.comment
            },
            ...todos,
        ])
        resetForms()
    }

    const acceptChanges = () => {
        const editedTodos = todos.map((el) => {
            if (editCardId === el.id) {
                return {
                    id: el.id,
                    created: el.created,
                    start: el.start,
                    end: el.end,
                    deliveryTime: forms.deliveryTime,
                    address: forms.address,
                    number: forms.number,
                    comment: forms.comment
                }
            }
            return el
        })
        setTodos(editedTodos)
        resetForms()
    }

    const padding = editCardId ? { padding: "0 10px" } : { padding: " 0 20px" }

    return (
        <div className="form">
            {toggle ? <>
                <button className="backBtn" onClick={() => setToggle(!toggle)}>Назад</button>
                <Group>
                    <Input type="text" value={filterValue.endsWith(":") ? filterValue.slice(0, -1) : filterValue} onChange={handleFilter} />
                    <FormInputLabel shrink={filterValue.length}>Время создания</FormInputLabel>
                </Group>
            </> : <>
                <Group>
                    <Input type="text" name="deliveryTime" value={forms.deliveryTime.endsWith(":") ? forms.deliveryTime.slice(0, -1) : forms.deliveryTime} onChange={handleChange} />
                    <FormInputLabel shrink={forms.deliveryTime.length}>Время доставки</FormInputLabel>
                </Group>
                <Group>
                    <Input type="text" name="address" value={forms.address} onChange={handleChange} />
                    <FormInputLabel shrink={forms.address.length}>Адрес</FormInputLabel>
                </Group>
                <Group>
                    <Input type="text" value={forms.number !== "+7" ? forms.number : ""} onChange={phoneNumberHandleChange} />
                    <FormInputLabel shrink={forms.number.length}>Телефон</FormInputLabel>
                </Group>
                <Group>
                    <Textarea name="comment" value={forms.comment} onChange={handleChange} />
                    <TextareaLabel shrink={forms.comment.length}>Комментарии</TextareaLabel>
                </Group>
                <div className="buttons">
                    {editCardId ? <>
                        <button style={padding} onClick={acceptChanges}>Применить</button>
                        <button style={padding} onClick={resetForms}>Сбросить</button>
                    </> : <>
                        <button style={padding} onClick={() => setToggle(!toggle)}>Найти</button>
                        <button style={padding} onClick={submit}>Создать</button>
                    </>}
                </div>
            </>}
        </div>
    )
}

export default Form