import React, {Component} from "react"
import {func, bool} from "prop-types"
import Checkbox from '../../theme/assets/Checkbox';

class Footer extends Component {

    static propTypes = {
        changeGlobalStateTasks: func.isRequired,
        isCheckAll: bool.isRequired
    };


    _targetCheckbox = () => {

        const {changeGlobalStateTasks, isCheckAll} = this.props;

        const action = {
            type: "CHANGE_ALL",
            value: !isCheckAll
        };

        changeGlobalStateTasks(action)

    };

    render() {

        const {isCheckAll} = this.props;
        return (
            <footer>
                <Checkbox onClick={this._targetCheckbox} checked={isCheckAll} color1="#000" color2="#f5f5f5"/>
                <span>Все задачи выполнены</span>

            </footer>
        )
    }
}

export default Footer

