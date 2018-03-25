import React, {Component} from 'react';
import Styles from './styles.scss';
import Task from '../Task';
import Form from '../Form';
import Footer from "../Footer"
import Search from "../Search";

class NewTask {

    constructor(message) {
        this.id = Date.now().toString();
        this.message = message;
        this.completed = false;
        this.favorite = false;
        this.created = new Date;
        this.modified = null;
    }

}

class Scheduler extends Component {

    state = {
        searchText: '',
        tasks: [
            {
                "id": "5a7f136231a5d90001271637",
                "message": "Hello Denis!",
                "completed": true,
                "favorite": false,
                "created": "2018-02-10T15:44:34.624Z",
                "modified": "2018-02-10T16:01:12.406Z"
            },
            {
                "id": "5a7f136131a5d90001271636",
                "message": "it my task",
                "completed": false,
                "favorite": false,
                "created": "2018-02-10T15:44:33.675Z"
            },
            {
                "id": "5a7f136031a5d90001271635",
                "message": "Hello",
                "completed": false,
                "favorite": true,
                "created": "2018-02-10T15:44:32.959Z"
            }
        ]
    };

    _setSearchText =(e) =>{
        this.setState({
            searchText: e.target.value
        })
    };


    _addTask = (message) => {

        const task = new NewTask(message);

        this.setState(({tasks}) => ({
            tasks: [task, ...tasks]
        }));
    };

    _changeGlobalStateTasks = ({type, id, value}) => {

        const {tasks} = this.state;

        switch (type) {

            case "COMPLETED" :
                const completed = tasks.map((e) => {
                    if (e.id === id) {
                        e.completed = !e.completed
                    }
                    return e;
                });
                this.setState({tasks: completed});
                break;

            case "FAVORITE" :
                const favorite = tasks.map((e) => {
                    if (e.id === id) {
                        e.favorite = !e.favorite
                    }
                    return e;
                });
                this.setState({tasks: favorite});
                break;

            case "DELETE" :
                const deleteTask = tasks.filter((e) => e.id !== id);
                this.setState({tasks: deleteTask});
                break;

            case "EDIT" :
                const edit = tasks.map((e) => {
                    if (e.id === id) {
                        e.message = value;
                        e.modified = new Date();
                    }
                    return e;
                });
                this.setState({tasks: edit});
                break;
            case "CHANGE_ALL" :

                const changeAll = tasks.map((e) => {

                    e.completed = value;

                    return e;
                });
                this.setState({tasks: changeAll});
                break;
        }

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

    _filterSearch = (task) =>{
        return task.filter((e) => e.message.toLocaleLowerCase().includes(this.state.searchText.toLocaleLowerCase()))
    };


    render() {

        let {tasks: tasksData, searchText} = this.state;

        tasksData = this._filterTasks(tasksData);
        tasksData = this._filterSearch(tasksData);

        let countCompletedTasks = 0;

        let tasks = tasksData.map(task => {

            if (task.completed) countCompletedTasks++;

            return (<Task
                    key={task.id}
                    id={task.id}
                    message={task.message}
                    completed={task.completed}
                    favorite={task.favorite}
                    changeGlobalStateTasks={this._changeGlobalStateTasks}
                />
            )
        });


        return (
            <div className={Styles.scheduler}>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <Search setSearchText = {this._setSearchText} searchText = {searchText}/>
                    </header>
                    <section>
                        <Form addTask={this._addTask}/>
                        <ul>
                            {tasks}
                        </ul>

                    </section>

                    <Footer isCheckAll={countCompletedTasks === tasks.length}
                            changeGlobalStateTasks={this._changeGlobalStateTasks}/>

                </main>

            </div>
        )
    }
}

export default Scheduler
