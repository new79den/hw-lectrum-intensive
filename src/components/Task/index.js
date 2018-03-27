import React, {Component} from "react"
import Styles from "./styles.scss"
import Checkbox from "../../theme/assets/Checkbox"
import Star from "../../theme/assets/Star"
import Edit from "../../theme/assets/Edit"
import Delete from "../../theme/assets/Delete"
import {string, number, bool} from "prop-types"


class Task extends Component {

    state = {
        isShowEdit: false,
        editMessage: ""
    };

    _changeGlobalStateTasks = (type) => {

        const {changeGlobalStateTasks, message, task} = this.props;

        const {editMessage} = this.state;
        Object.assign(task, {message: editMessage.trim() ? editMessage : message});

        const action = {
            type: type,
            value: task
        };

        changeGlobalStateTasks(action);
    };

    _handleEditField = () => {
        const {isShowEdit} = this.state;

        if (this.props.completed) return false;

        if (isShowEdit) {
            this._changeGlobalStateTasks("EDIT");

        } else {

            this.setState({
                editMessage: this.props.message
            })
        }

        this.setState({
            isShowEdit: !this.state.isShowEdit
        })

    };

    _editMessage = (event) => {

        const value = event.target.value;


        if (value.length > 46) return false;

        this.setState({
            editMessage: value
        })

    };

    _escFunction = (event) => {


        if (event.keyCode === 27) this._resetState();
    }

    _resetState = () =>{
        this.setState({
            editMessage: "",
            isShowEdit: false
        });
    };

    componentWillReceiveProps(){
       this._resetState();
    }

    componentDidMount() {
        document.addEventListener("keydown", this._escFunction, false);

    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._escFunction, false);

    }



    render() {

        const {completed, favorite, message} = this.props;
        const {isShowEdit, editMessage} = this.state;

        const taskStyles = completed
            ? `${Styles.task} ${Styles.completed}`
            : Styles.task;

        return (
            <li className={taskStyles}>
                <div>
                <span>

                        <Checkbox onClick={() => this._changeGlobalStateTasks("COMPLETED")} checked={completed}
                                  color1="#3B8EF3"
                                  color2="#fff"/>

                </span>

                    {
                        isShowEdit
                            ?
                            <input placeholder="введите текст" onChange={this._editMessage} type="text"
                                   value={editMessage}/>
                            :
                            <span className={completed ? Styles.through : null}>{message}</span>
                    }

                </div>

                <div>
                    <Star checked={favorite} onClick={() => this._changeGlobalStateTasks("FAVORITE")} color1="#3B8EF3"
                          color2="#000"/>
                    <Edit onClick={this._handleEditField} color1="#3B8EF3" color2={isShowEdit ? "#3B8EF3" : "#000"}/>
                    <Delete onClick={() => this._changeGlobalStateTasks("DELETE")} color1="#3B8EF3" color2="#000"/>
                </div>
            </li>
        )
    }

}

Task.propTypes = {
    id: string.isRequired,
    message: string.isRequired,
    completed: bool.isRequired,
    favorite: bool.isRequired,
}

export default Task;
