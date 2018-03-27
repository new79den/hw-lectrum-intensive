import React, {Component} from "react"
import propTypes, {string} from "prop-types"

const withState = (Injectable) => {
    class Enchancer extends Component {

        static contextTypes = {
            api: string.isRequired,
            authorization: string.isRequired
        };

        state = {
            tasks: []
        };


        _changeGlobalStateTasks = (action) => {
            const {tasks} = this.state;

            switch (action.type) {
                case "ADD" :
                    this._addTaskAPI(action.value);
                    break;

                case "DELETE" :
                    this._deleteTaskAPI(action.id);
                    break;

                case "EDIT" :

                    this._editTaskAPI(action.value);
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

        _fetchTasksAPI = async () => {

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


        _addTaskAPI = async (text) => {
            const {api, authorization} = this.context;

            fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                },
                body: JSON.stringify({message: text})
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

        };

        _deleteTaskAPI = async (id) => {
            const {api, authorization} = this.context;

            fetch(`${api}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': authorization
                },

            }).then(() => {
                this._deleteTaskState(id);
            }).catch((err) => {
                console.log(err.message)
            });

        };

        _deleteTaskState = (id) => {
            const {tasks} = this.state;
            const deleteTask = tasks.filter((e) => e.id !== id);
            this.setState({tasks: deleteTask});
        };

        _editTaskAPI = async (editedTask) => {

            const {api, authorization} = this.context;

            fetch(api, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                },

                body: JSON.stringify([editedTask])
            }).then(response => {
                if (response.status !== 200) {
                    throw new Error('create post err')
                }
                return response.json()
            }).then((res) => {
                res = res.data;
                this.setState(({tasks}) => ({
                  //  tasks: [...res, ...tasks],
                }));

            }).catch((err) => {
                console.log(err.message)
            });
        };

        componentDidMount() {
            this._fetchTasksAPI();
        }


        render() {
            return <Injectable
                changeGlobalStateTasks={this._changeGlobalStateTasks}
                {...this.state}
            />
        }
    }

    return Enchancer
}

export default withState;