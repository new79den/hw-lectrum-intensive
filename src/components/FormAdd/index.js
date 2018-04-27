import React, { Component } from 'react';
import { Form, Control, Errors} from "react-redux-form";


class FormAdd extends Component {

    state = {
        message: '',
    };

    _setMessage = (event) => {
        const message = event.target.value;

        if (message.length <= 46) {
            this.setState(() => ({
                message,
            }));
        }
    };

    _addTask = (event) => {
        event.preventDefault();
        const { message } = this.state;
        const { addTask } = this.props;

        if (message.trim()) {

            addTask(message);
            this.setState(() => ({
                message: '',
            }));
        }
    };

    _countSymbols = () => {
        const lengthMsg = this.state.message.length;

        if (lengthMsg) {
            const availableSymbols = 46 - lengthMsg;

            return `Вам доступно еще ${availableSymbols} символов`;
        }
    };

    _handleSubmit = (message) => {
        const { addTask } = this.props;
        addTask(message);

    };

    render () {
       /* const { message } = this.state;*/
        return (

            <Form
                model = 'forms.task'
                onSubmit = { this._handleSubmit }>
                <Control.input model = 'forms.task.message' />

                <Errors
                    model = "forms.task"
                    messages={{
                        isRequired: 'Please provide an email address.',
                    }}
                />

                <button type = 'submit'>Добавить задачу</button>
            </Form>
        );
    }
}


export default FormAdd;


{/*
<div>
    <p>{ this._countSymbols() }</p>
    <input
        type = 'text'
        value = { message }
        onChange = { this._setMessage }
    />
</div>
                <button disabled = { !message.trim() } onClick = { this._addTask }>Добавить задачу</button>
*/}
