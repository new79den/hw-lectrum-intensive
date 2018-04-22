// Core
import React, { Component } from 'react';
import Catcher from '../../components/Catcher';
// Components
import SchedulerComponent from '../../components/Scheduler/Scheduler';

export default class App extends Component {
    render () {
        return (
            <Catcher>
                <SchedulerComponent />
            </Catcher>
        );
    }
}
