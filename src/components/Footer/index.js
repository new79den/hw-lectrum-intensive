import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import Checkbox from '../../theme/assets/Checkbox';

class Footer extends Component {
/*    static propTypes = {
        changeGlobalStateTasks: func.isRequired,
        isCheckAll:             bool.isRequired,
    };*/

    _targetCheckbox = () => {
        const { chooseAllTask, isCheckAll } = this.props;

        chooseAllTask(!isCheckAll);
    };

    render () {
        const { isCheckAll } = this.props;

        return (
            <footer>
                <Checkbox
                    checked = { isCheckAll }
                    color1 = '#000'
                    color2 = '#f5f5f5'
                    onClick = { this._targetCheckbox }
                />
                <span>Все задачи выполнены</span>
            </footer>
        );
    }
}

export default Footer;
