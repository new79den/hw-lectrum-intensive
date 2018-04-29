//Core
import React, { Component } from 'react';
// Instruments
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

    _handleEditField = () => {
        const { isShowEdit, editMessage } = this.state;
        const { task } = this.props;
        const completed = task.get('completed');
        const message = task.get('message');

        if (!completed) {
            if (isShowEdit && editMessage !== message && editMessage) {
                this._handleEditTask('message');
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

    _handleEditTask = (field) => {
        const { task, actions } = this.props;
        const newTask = {
            message:   field === 'message' ? this.state.editMessage : task.get('message'),
            id:        task.get('id'),
            completed: field === 'completed' ? !task.get('completed') : task.get('completed'),
            favorite:  field === 'favorite' ? !task.get('favorite') : task.get('favorite'),
        };

        actions.editTask(newTask);
    };

    _deleteTask = () => {
        const { actions, task } = this.props;

        actions.deleteTask(task.get('id'));
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
        const { task } = this.props;
        const { isShowEdit, editMessage } = this.state;
        const taskStyles = task.get('completed') ? `${Styles.task} ${Styles.completed}` : Styles.task;

        return (
            <li className = { taskStyles }>
                <div>
                    <span>
                        <Checkbox
                            checked = { task.get('completed') }
                            color1 = '#3B8EF3'
                            color2 = '#fff'
                            onClick = { () => this._handleEditTask('completed') }
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
                        <span className = { task.get('completed') ? Styles.through : null }>{ task.get('message') }</span>
                    }
                </div>
                <div>
                    <Star
                        checked = { task.get('favorite') }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { () => this._handleEditTask('favorite') }
                    />
                    <Edit
                        color1 = '#3B8EF3'
                        color2 = { isShowEdit ? '#3B8EF3' : '#000' }
                        onClick = { this._handleEditField }
                    />
                    <Delete
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { () => this._deleteTask() }
                    />
                </div>
            </li>
        );
    }
}

export default Task;
