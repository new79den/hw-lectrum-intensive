import React, {Component} from "react"
import {func} from "prop-types"

class Form extends Component {

    static propTypes = {
        changeGlobalStateTasks: func.isRequired
    };

    state = {
        message: "",
    };

    _setMessage = (event) => {
        const message = event.target.value;

        if (message.length > 46) return false;

        this.setState(() => ({
            message: message
        }))
    };

    _addTask = (event) => {

        event.preventDefault();


        const {changeGlobalStateTasks} = this.props;
        const {message} = this.state;

        if (!message.trim()) return false;

        const action = {
            type: "ADD",
            value: message
        };


        changeGlobalStateTasks(action);

        this.setState(() => ({
            message: ""
        }))
    };

    _countSymbols = () => {

        const lengthMsg = this.state.message.length;
        if (lengthMsg) {
            const availableSymbols = 46 - lengthMsg;
            return `Вам доступно еще ${availableSymbols} символов`;
        }
    }

    render() {

        const {message} = this.state;

        return (
            <form>
                <div>
                    <p>{this._countSymbols()}</p>
                    <input value={message} onChange={this._setMessage} type="text"/>
                </div>

                <button disabled={!message.trim()} onClick={this._addTask}>Добавить задачу</button>
            </form>
        )
    }
}

export default Form
