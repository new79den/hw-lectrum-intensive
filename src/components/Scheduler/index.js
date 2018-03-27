import React, {Component} from 'react';
import Styles from './styles.scss';
import Task from '../Task';
import Form from '../Form';
import Footer from "../Footer"
import Search from "../Search";
import {string} from "prop-types"
import withState from "../witchState";


class Scheduler extends Component {


    state = {
        searchText: '',
    };

    _setSearchText = (e) => {
        this.setState({
            searchText: e.target.value
        })
    };


    _filterTasks = (tasks) => {
        return tasks.sort(((a, b) => {

            let dateA = a.modified || a.created;
            let dateB = b.modified || b.created;

            dateA = new Date(dateA);
            dateB = new Date(dateB);

            if ((a.favorite || b.favorite) && (!a.completed && !b.completed)) {

                if (a.favorite && b.favorite) return dateB > dateA ? 1 : -1;
                if (a.favorite && !b.favorite) return -1;
                if (!a.favorite && b.favorite) return 1;

            } else if (a.completed || b.completed) {

                if (a.completed && b.completed) {

                    if (!a.favorite && b.favorite) return 1;
                    if (a.favorite && !b.favorite) return -1;
                    return dateB > dateA ? 1 : -1;
                }
                if (a.completed && !b.completed) return 1;
                if (!a.completed && b.completed) return -1;

            } else {
                return dateB > dateA ? 1 : -1;
            }

        }))
    };

    _filterSearch = (task) => {
        return task.filter((e) => e.message.toLocaleLowerCase().includes(this.state.searchText.toLocaleLowerCase()))
    };


    render() {

        let {searchText} = this.state;
        const {changeGlobalStateTasks} = this.props;
        let {tasks: tasksData} = this.props;

        tasksData = this._filterTasks(tasksData);
        tasksData = this._filterSearch(tasksData);

        let countCompletedTasks = 0;

        let tasks = tasksData.map(task => {

            if (task.completed) countCompletedTasks++;
            return (<Task
                    key={task.id}
                    task={task}
                    changeGlobalStateTasks={changeGlobalStateTasks}
                />
            )
        });

        return (
            <div className={Styles.scheduler}>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <Search setSearchText={this._setSearchText} searchText={searchText}/>
                    </header>
                    <section>
                        <Form changeGlobalStateTasks={changeGlobalStateTasks}/>
                        <ul>
                            {tasks}
                        </ul>

                    </section>

                    <Footer isCheckAll={countCompletedTasks === tasks.length}
                            changeGlobalStateTasks={changeGlobalStateTasks}/>

                </main>

            </div>
        )
    }
}

export default withState(Scheduler);
