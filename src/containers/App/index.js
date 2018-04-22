// Core
import React, { Component } from 'react';
import { string } from 'prop-types';
import Catcher from '../../components/Catcher';

// Components
import SchedulerComponent from '../../components/Scheduler/Scheduler.component';


export default class App extends Component {

    render () {

        return (
            <Catcher>
                <SchedulerComponent />
            </Catcher>
        );
    }
}
