import { takeEvery } from 'redux-saga/effects';
import types from '../types';
import { fetchTasksWorker } from './workers/fetchTasksWorker';
import { deleteTaskWorker } from './workers/deleteTaskWorker';
import { addTaskWorker } from './workers/addTaskWorker';
import { editTaskWorker } from './workers/editTaskWorker';
import { chooseAllTasksWorker } from './workers/chooseAllTasksWorker';

export default Object.freeze({
    * fetchPostWorkers () {
        yield takeEvery(types.FETCH_TASKS, fetchTasksWorker);
        yield takeEvery(types.ADD_TASK, addTaskWorker);
        yield takeEvery(types.DELETE_TASK, deleteTaskWorker);
        yield takeEvery(types.EDIT_TASK, editTaskWorker);
        yield takeEvery(types.CHOOSE_ALL_TASKS, chooseAllTasksWorker);
    },
});
