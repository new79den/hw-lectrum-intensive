import React, {Component} from "react"
import {func, bool} from "prop-types"
import Checkbox from '../../theme/assets/Checkbox';

class Footer extends Component {

    static propTypes = {
        changeGlobalStateTasks: func.isRequired,
        isCheckAll: bool.isRequired
    };

    state = {
        isCheckboxChecked: this.props.isCheckAll
    };

    _targetCheckbox = () => {

        const {isCheckboxChecked} = this.state;
        const {changeGlobalStateTasks} = this.props;

        const action = {
            type: "CHANGE_ALL",
            value: !isCheckboxChecked
        };

        this.setState(({isCheckboxChecked}) => ({
            isCheckboxChecked: !isCheckboxChecked
        }));


        changeGlobalStateTasks(action)

    };

    render() {

        const {isCheckboxChecked} = this.state;

        return (
            <footer>
                <Checkbox onClick={this._targetCheckbox} checked={isCheckboxChecked} color1="#000" color2="#f5f5f5"/>
                <span>Все задачи выполнены</span>

            </footer>
        )
    }
}

export default Footer

