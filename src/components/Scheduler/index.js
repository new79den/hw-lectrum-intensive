import React, {Component} from 'react';
import Styles from './styles.scss';
import Task from '../Task';
import Form from '../Form';
import Footer from "../Footer"
import Search from "../Search";
import {string} from "prop-types"

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

    static contextTypes = {
        api: string.isRequired,
        authorization: string.isRequired
    };

    state = {
        searchText: '',
        tasks: []
    };

    _setSearchText = (e) => {
        this.setState({
            searchText: e.target.value
        })
    };


    _saveAndUpdateTasksInLocalStorage = () => {

        const arrayToObject = (array) =>
            array.reduce((obj, item) => {
                obj[item["id"]] = item;
                return obj
            }, {});

        let {tasks} = this.state;
        tasks = arrayToObject(tasks);
        tasks = JSON.stringify(tasks);

        localStorage.setItem("tasks", tasks);
    };


    _changeGlobalStateTasks = ({type, id, value}) => {

        const {tasks} = this.state;
        switch (type) {
            case "ADD" :

                const {api, authorization} = this.context;

                fetch(api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authorization
                    },
                    body: JSON.stringify({message: value})
                }).then(response => {
                    if (response.status !== 200) {
                        throw new Error('create post err')
                    }
                    return response.json()
                }).then((res) => {

                    res = res.data;
                    this.setState(({tasks}) => ({
                        tasks: [res, ...tasks],
                    }));

                }).catch((err) => {
                    console.log(err.message)
                });


                break;

            case "DELETE" :

                const {api: api1, authorization: authorization1} = this.context;


                fetch(`${api1}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': authorization1
                    },

                }).catch((err) => {
                    console.log(err.message)
                });
                
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
        }

    };

    _fetchPost = async () => {

        const {api, authorization} = this.context;

        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
        }).then(response => {
            if (response.status !== 200) {
                throw new Error('create post err')
            }
            return response.json()
        }).then((res) => {

             res = res.data;
           this.setState(({tasks}) => ({
                tasks: [...res, ...tasks],
            }));

        }).catch((err) => {
            console.log(err.message)
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

    componentDidMount() {

       /* let tasks = localStorage.getItem("tasks");
        if (!tasks) return false;
        tasks = JSON.parse(tasks);
        tasks = Object.values(tasks);

        this.setState({
            tasks: tasks
        })*/

        this._fetchPost();
    }

    componentDidUpdate() {
        this._saveAndUpdateTasksInLocalStorage();
    }


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
                        <Search setSearchText={this._setSearchText} searchText={searchText}/>
                    </header>
                    <section>
                        <Form changeGlobalStateTasks={this._changeGlobalStateTasks}/>
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
