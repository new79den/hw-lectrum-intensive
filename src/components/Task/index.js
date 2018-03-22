import React from "react"
import Styles from "./styles.scss"
import Checkbox from "../../theme/assets/Checkbox"
import Star from "../../theme/assets/Star"
import Edit from "../../theme/assets/Edit"
import Delete from "../../theme/assets/Delete"
import propoTypes from "prop-types"


function Task(props) {

    return (
        <li className={Styles.task}>
            <div>
                <span>
                    <Checkbox color1 = "#3B8EF3" color2 = "#fff"/>
                </span>
                <span>
   Lorem ipsum dolor sit.
                </span>
            </div>


            <div>
                <Star color1 = "#3B8EF3" color2 = "#000"/>
                <Edit color1 = "#3B8EF3" color2 = "#000"/>
                <Delete color1 = "#3B8EF3" color2 = "#000"/>
            </div>
        </li>
    )
}


export default Task;
