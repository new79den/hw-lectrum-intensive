// Core
import React, { Component } from 'react';
import {string} from "prop-types"
import Catcher from "../../components/Catcher"

// Components
import Scheduler from 'components/Scheduler';

const option = {
    api: 'https://lab.lectrum.io/hw/todo/api',
    authorization: 'YVtdsQpz8T1UvOBo'
}

export default class App extends Component {

    static childContextTypes = {
        api : string.isRequired,
        authorization: string.isRequired
    };

    getChildContext(){
        return {
            api: option.api,
            authorization: option.authorization
        }
    }

    render () {
      return (
          <Catcher>
          <Scheduler/>
          </Catcher>
      )
    }
}