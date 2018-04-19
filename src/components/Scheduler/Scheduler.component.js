import React, { Component } from 'react';
import Styles from './styles.scss';
import Task from '../Task';
import Scheduler from "./Scheduler"
import withState from '../witchState';
import Catcher from '../Catcher';
import { CSSTransition } from 'react-transition-group';
import { func, array } from "prop-types";

export const filterTasks  = (tasks) => {
    const favorite = tasks.filter((task) => task.favorite && !task.completed);
    const data = tasks.filter((task) => !task.favorite && !task.completed);
    const completed = tasks.filter((task) => task.completed);

    completed.sort((a, b) => {
        if (a.favorite && !b.favorite) {
            return -1;
        } else if (!a.favorite && b.favorite) {
            return 1;
        }

        return false;
    });

    return [...favorite, ...data, ...completed];
};

export const filterSearch = (tasks, searchText) => {
    return tasks.filter((e) => e.message.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
};

class SchedulerComponent extends Component {

    static propTypes = {
        changeGlobalStateTasks: func.isRequired,
        tasks: array.isRequired,
    };

    state = {
        searchText: '',
    };

    _setSearchText = (e) => {
        this.setState({
            searchText: e.target.value,
        });
    };

    render () {

        const { searchText } = this.state;
        const { changeGlobalStateTasks } = this.props;
        let { tasks: tasksData } = this.props;

        tasksData = filterTasks(tasksData);
        tasksData = filterSearch(tasksData, this.state.searchText);

        let countCompletedTasks = 0;

        const tasks = tasksData.map((task) => {

            if (task.completed) {
                countCompletedTasks = countCompletedTasks + 1;
            }

            return (
                <CSSTransition
                    classNames = { {
                        enter:       Styles.postInStart,
                        enterActive: Styles.postInEnd,
                        exit:        Styles.postOutStart,
                        exitActive:  Styles.postOutEnd,
                    } }
                    key = { task.id }
                    timeout = { { enter: 200, exit: 200 } }>
                    <Catcher key = { task.id }>
                        <Task
                            changeGlobalStateTasks = { changeGlobalStateTasks }
                            key = { task.id }
                            task = { task }
                        />
                    </Catcher>
                </CSSTransition>
            );
        });

        return (
            <Scheduler
                changeGlobalStateTasks = {changeGlobalStateTasks}
                countCompletedTasks = {countCompletedTasks}
                tasks = {tasks}
                searchText = {searchText}
                _setSearchText = {this._setSearchText}
            />
        );
    }
}

export default withState(SchedulerComponent);
