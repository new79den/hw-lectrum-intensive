import React from "react"
import Styles from "./styles.scss"
import Checkbox from "../../theme/assets/Checkbox"
import Star from "../../theme/assets/Star"
import Edit from "../../theme/assets/Edit"
import Delete from "../../theme/assets/Delete"
import {string, number, bool} from "prop-types"


function Task({id, message, completed, favorites}) {


    return (
        <li className={Styles.task}>
            <div>
                <span>
                    <Checkbox checked = {completed}  color1="#3B8EF3" color2="#fff"/>
                </span>

                <span className = { completed ?  Styles.through: null}>
                   {message}
                </span>

            </div>


            <div>
                <Star color1="#3B8EF3" color2="#000"/>
                <Edit color1="#3B8EF3" color2="#000"/>
                <Delete color1="#3B8EF3" color2="#000"/>
            </div>
        </li>
    )
}


Task.propTypes = {
    id: string.isRequired,
    message: string.isRequired,
    completed: bool.isRequired,
    favorite: bool.isRequired,
}

export default Task;
