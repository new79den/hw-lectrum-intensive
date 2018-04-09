import React, { Component } from 'react';
import Styles from './styles.scss';
import Task from '../Task';
import Form from '../Form';
import Footer from '../Footer';
import Search from '../Search';
import withState from '../witchState';
import Catcher from '../Catcher';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Scheduler extends Component {
    state = {
        searchText: '',
    };

    _setSearchText = (e) => {
        this.setState({
            searchText: e.target.value,
        });
    };

    _filterTasks (tasks) {
        return tasks.sort((a, b) => {

            let dateA = a.modified || a.created;
            let dateB = b.modified || b.created;

            dateA = new Date(dateA);
            dateB = new Date(dateB);

            if ((a.favorite || b.favorite) && (!a.completed && !b.completed)) {

                if (a.favorite && b.favorite) return dateB > dateA ? 1 : -1;
                if (a.favorite && !b.favorite) {
                    return -1;
                }
                if (!a.favorite && b.favorite) {
                    return 1;
                }

            } else if (a.completed || b.completed) {

                if (a.completed && b.completed) {
                    if (!a.favorite && b.favorite) {
                        return 1;
                    }
                    if (a.favorite && !b.favorite) {
                        return -1;
                    }

                    return dateB > dateA ? 1 : -1;
                }
                if (a.completed && !b.completed) {
                    return 1;
                }
                if (!a.completed && b.completed) {
                    return -1;
                }

            } else {
                return dateB > dateA ? 1 : -1;
            }

            return false;
        });
    }

    _filterSearch (task) {
        return task.filter((e) => e.message.toLocaleLowerCase().includes(this.state.searchText.toLocaleLowerCase()));
    }

    render () {

        const { searchText } = this.state;
        const { changeGlobalStateTasks } = this.props;
        let { tasks: tasksData } = this.props;

        tasksData = this._filterTasks(tasksData);
        tasksData = this._filterSearch(tasksData);

        let countCompletedTasks = 0;

        const tasks = tasksData.map((task) => {

            if (task.completed) {
                countCompletedTasks += countCompletedTasks;
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
            <div className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <Search searchText = { searchText } setSearchText = { this._setSearchText } />
                    </header>
                    <section>
                        <Form changeGlobalStateTasks = { changeGlobalStateTasks } />
                        <ul>
                            <TransitionGroup>
                                { tasks }
                            </TransitionGroup>
                        </ul>

                    </section>

                    {tasks.length
                        ?
                        <Footer
                            changeGlobalStateTasks = { changeGlobalStateTasks }
                            isCheckAll = { countCompletedTasks === tasks.length }
                        />
                        :
                        null
                    }

                </main>

            </div>
        );
    }
}

export default withState(Scheduler);
