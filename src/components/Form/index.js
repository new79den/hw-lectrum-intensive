import React, { Component } from 'react';

class Form extends Component {

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

    render () {
        const { message } = this.state;
        return (
            <form>
                <div>
                    <p>{ this._countSymbols() }</p>
                    <input
                        type = 'text'
                        value = { message }
                        onChange = { this._setMessage }
                    />
                </div>

                <button disabled = { !message.trim() } onClick = { this._addTask }>Добавить задачу</button>
            </form>
        );
    }
}

export default Form;
