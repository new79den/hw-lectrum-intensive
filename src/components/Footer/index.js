import React, { Component } from 'react';
import Checkbox from '../../theme/assets/Checkbox';

class Footer extends Component {

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
