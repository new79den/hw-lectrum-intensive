import React, { Component } from 'react';
import Styles from './styles.scss';
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Delete from '../../theme/assets/Delete';

class Task extends Component {
    state = {
        isShowEdit:  false,
        editMessage: '',
    };

    componentDidMount () {
        document.addEventListener('keydown', this._handleKeyPress, false);
    }

    componentWillReceiveProps () {
        this._resetState();
    }

    componentWillUnmount () {
        document.removeEventListener('keydown', this._handleKeyPress, false);
    }

    _changeGlobalStateTasks = (type) => {
        const { changeGlobalStateTasks, task } = this.props;
        const action = {
            type,
            task,
        };

        changeGlobalStateTasks(action);
    };

    _handleEditField = () => {
        const { isShowEdit, editMessage } = this.state;
        const { message, completed } = this.props.task;

        if (!completed) {
            if (isShowEdit && editMessage !== message) {
                const { task } = this.props;

                Object.assign(task, { message: editMessage.trim() ? editMessage : task.message });
                this._changeGlobalStateTasks('EDIT');
            } else {
                this.setState({
                    editMessage: message,
                });
            }

            this.setState({
                isShowEdit: !this.state.isShowEdit,
            });
        }
    };

    _handleEditFavorite = () => {
        const { task } = this.props;

        Object.assign(task, { favorite: !task.favorite });
        this._changeGlobalStateTasks('EDIT');
    };

    _handleEditCompleted = () => {
        const { task } = this.props;

        Object.assign(task, { completed: !task.completed });
        this._changeGlobalStateTasks('EDIT');
    };

    _editMessage = (event) => {
        const value = event.target.value;

        if (value.length <= 46) {
            this.setState({
                editMessage: value,
            });
        }
    };

    _handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            this._resetState();
        }

        if (event.key === 'Enter' && this.state.isShowEdit) {
            this._handleEditField();
        }
    };

    _resetState = () => {
        this.setState({
            editMessage: '',
            isShowEdit:  false,
        });
    };

    render () {
        const { completed, favorite, message } = this.props.task;
        const { isShowEdit, editMessage } = this.state;
        const taskStyles = completed ? `${Styles.task} ${Styles.completed}` : Styles.task;

        return (
            <li className = { taskStyles }>
                <div>
                    <span>
                        <Checkbox
                            checked = { completed }
                            color1 = '#3B8EF3'
                            color2 = '#fff'
                            onClick = { () => this._handleEditCompleted() }
                        />
                    </span>
                    { isShowEdit
                        ?
                        <input
                            placeholder = 'введите текст'
                            type = 'text'
                            value = { editMessage }
                            onChange = { this._editMessage }
                        />
                        :
                        <span className = { completed ? Styles.through : null }>{ message }</span>
                    }
                </div>
                <div>
                    <Star
                        checked = { favorite }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { () => this._handleEditFavorite() }
                    />
                    <Edit
                        color1 = '#3B8EF3'
                        color2 = { isShowEdit ? '#3B8EF3' : '#000' }
                        onClick = { this._handleEditField }
                    />
                    <Delete
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { () => this._changeGlobalStateTasks('DELETE') }
                    />
                </div>
            </li>
        )
    }

}


export default Task;
