import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { taskAction } from '../../bus/search/actions';


class Search extends Component {
    _changeText = (e) => {
        this.props.actions.changeText(e.target.value);
    };

    render () {
        const { searchText } = this.props;

        return (
            <input
                type = 'text'
                value = { searchText }
                onChange = { this._changeText }
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchText: state.search,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            changeText: taskAction.changeText,
        }, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
