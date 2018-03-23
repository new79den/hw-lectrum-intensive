import React, {Component} from 'react';
import Styles from './styles.scss';
import Checkbox from '../../theme/assets/Checkbox';
import Task from '../Task';
import Form from '../Form';

class NewTask {

    constructor(message) {
        this.id = Date.now().toString();
        this.message = message;
        this.completed = false;
        this.favorite = false;
    }

}

class Scheduler extends Component {

    state = {
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

    _addTask = (message) => {

        const task = new NewTask(message);

        this.setState(({tasks}) => ({
            tasks: [task, ...tasks]
        }));
    };


    render() {

        const {tasks: tasksData} = this.state;

        const tasks = tasksData.map(task => (
            <Task
                key={task.id}
                id={task.id}
                message={task.message}
                completed={task.completed}
                favorite={task.favorite}
            />
        ));


        return (
            <div className={Styles.scheduler}>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input type="text"/>
                    </header>
                    <section>
                        <Form addTask={this._addTask}/>
                        <ul>
                            {tasks}
                        </ul>

                    </section>

                    <footer>

                        <Checkbox color1="#000" color2="#f5f5f5"/>
                        <span>Все задачи выполнены</span>

                    </footer>
                </main>

            </div>
        )
    }
}

export default Scheduler
