//Core
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { List } from 'immutable'
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
        if (a.get('favorite') && !b.get('favorite'))
            return -1;

        if (!a.get('favorite') && b.get('favorite'))
            return 1;

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

    state = {
        searchText: '',
    };

    _setSearchText = (e) => {
        this.setState({
            searchText: e.target.value,
        });
    };

    componentDidMount () {
        this.props.actions.fetchTasks();
    }

    render () {
        const { searchText } = this.state;
        let { tasks: tasksData, actions } = this.props;

        tasksData = filterTasks(tasksData);
        tasksData = filterSearch(tasksData, this.state.searchText);

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
                            key = { task.get('id') }
                            task = { task }
                            actions = {actions}
                        />
                    </Catcher>
                </CSSTransition>
            );
        });

        return <div className={Styles.scheduler}>
            <main>
                <header>
                    <h1>Планировщик задач</h1>
                    <Search searchText={searchText} setSearchText={this._setSearchText}/>
                </header>
                <section>
                    <Form addTask={actions.addTask}/>
                    <ul>
                        <TransitionGroup>
                            {tasks}
                        </TransitionGroup>
                    </ul>

                </section>

                {!tasks.size ? null : <Footer
                    isCheckAll={countCompletedTasks === tasks.size}
                    chooseAllTask = { actions.chooseAllTask }
                />
                }
            </main>
        </div>;
    }
}

const mapStateToProps = (state) =>{
    return {
        tasks: state.tasks
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: bindActionCreators({
            fetchTasks: taskAction.fetchTasks,
            addTask: taskAction.addTask,
            chooseAllTask: taskAction.chooseAllTask,
            editTask: taskAction.editTask,
            deleteTask: taskAction.deleteTask
        }, dispatch),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SchedulerComponent);
