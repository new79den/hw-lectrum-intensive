import { all } from 'redux-saga/effects';
import tasks from '../bus/tasks/saga/watchers';

export function* rootSaga () {
    yield all([tasks.fetchPostWorkers()]);
}
