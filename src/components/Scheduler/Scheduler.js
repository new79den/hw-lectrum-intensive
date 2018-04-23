//Core
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { List } from 'immutable';
// Instruments
import Styles from './styles.scss';
import { taskAction } from '../../bus/tasks/actions';
// Components
import Task from '../Task';
import Catcher from '../Catcher';
import Search from '../Search';
import Form from '../Form';
import Footer from '../Footer';

export const filterTasks  = (tasks) => {

    const favorite = tasks.filter((task) => task.get('favorite') && !task.get('completed'));
    const data = tasks.filter((task) => !task.get('favorite') && !task.get('completed'));
    const completed = tasks.filter((task) => task.get('completed'));

    completed.sort((a, b) => {
        if (a.get('favorite') && !b.get('favorite')) {
            return -1;
        }

        if (!a.get('favorite') && b.get('favorite')) {
            return 1;
        }

        return 0;
    });

    return List([...favorite, ...data, ...completed]);
};

export const filterSearch = (tasks, searchText) => {
    return tasks.filter((e) => e.get('message')
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase()));
};


class SchedulerComponent extends Component {
    componentDidMount () {
        this.props.actions.fetchTasks();
    }

    render () {
        const { tasks: tasksData, actions } = this.props;
        let countCompletedTasks = 0;

        const tasks = tasksData.map((task) => {

            if (task.get('completed')) {
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
                    key = { task.get('id') }
                    timeout = { { enter: 200, exit: 200 } }>
                    <Catcher key = { task.get('id') }>
                        <Task
                            actions = { actions }
                            key = { task.get('id') }
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
                        <Search />
                    </header>
                    <section>
                        <Form addTask = { actions.addTask } />
                        <ul>
                            <TransitionGroup>
                                { tasks }
                            </TransitionGroup>
                        </ul>
                    </section>

                    {!tasks.size ? null : <Footer
                        chooseAllTask = { actions.chooseAllTask }
                        isCheckAll = { countCompletedTasks === tasks.size }
                    />
                    }
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const filterTasksByPriority = filterTasks(state.tasks);
    const filterTasksBySearchText = filterSearch(filterTasksByPriority, state.forms.search.text);

    return {
        tasks: filterTasksBySearchText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchTasks:    taskAction.fetchTasks,
            addTask:       taskAction.addTask,
            chooseAllTask: taskAction.chooseAllTask,
            editTask:      taskAction.editTask,
            deleteTask:    taskAction.deleteTask,
        }, dispatch),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SchedulerComponent);
