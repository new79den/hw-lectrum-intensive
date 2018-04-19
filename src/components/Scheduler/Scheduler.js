import React from 'react';
import Styles from './styles.scss';
import Form from '../Form';
import Footer from '../Footer';
import Search from '../Search';
import { TransitionGroup } from 'react-transition-group';
import {func, number, element, string} from 'prop-types';

function Scheduler({ changeGlobalStateTasks, countCompletedTasks, tasks, searchText, _setSearchText }) {
    return (
        <div className = { Styles.scheduler }>
            <main>
                <header>
                    <h1>Планировщик задач</h1>
                    <Search searchText = { searchText } setSearchText = { _setSearchText } />
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
    )
}

Scheduler.propoTypes = {
    changeGlobalStateTasks: func.isRequired,
    countCompletedTasks: number.isRequired,
    tasks: element.isRequired,
    searchText:    string.isRequired,
};

export default Scheduler;