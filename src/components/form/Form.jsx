import { useState } from 'react'

import { FormInputLabel, TextareaLabel, Input, Textarea, Group } from './Input.jsx'

import './form.scss'

const Form = ({ todos, setTodos }) => {

    const [forms, setForms] = useState({
        deliveryTime: "",
        address: "",
        number: "",
        comment: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "deliveryTime") {
            setForms({ ...forms, [name]: value.length <= 4 ? value.replace(/[^+\d]/g, '').replace(/.{2}/g, '$&:') : value.replace(/[^+\d]/g, '').replace(/.{2}/g, '$&:').slice(0, -1)})
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

    const submit = () => {
        setTodos([
            {
                id: Math.random(),
                start: "",
                end: "",
                deliveryTime: forms.deliveryTime,
                address: forms.address,
                number: forms.number,
                comment: forms.comment
            },
            ...todos,
        ])
        setForms({
            deliveryTime: "",
            address: "",
            number: "",
            comment: ""
        })
    }

    return (
        <div className="form">
            <Group>
                <Input type="text" name="deliveryTime" value={forms.deliveryTime} onChange={handleChange} />
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
            <div className="button" onClick={submit}>
                <p>Создать</p>
            </div>
        </div>
    )
}

export default Form