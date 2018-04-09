import React, { Component } from 'react';
import { object } from 'prop-types';
import Styles from './style.scss';

class Catcher extends Component {
    static propTypes = {
        children: object.isRequired,
    };

    state = {
        err: false,
    };

    componentDidCatch () {
        this.setState({
            err: true,
        });
    }

    render () {
        const { err } = this.state;
        const { children } = this.props;

        if (err) {
            return (<section className = { Styles.catcher }>
                <span>Sorry! We have some problem :(</span>
            </section>);
        }

        return children;
    }
}

export default Catcher;
