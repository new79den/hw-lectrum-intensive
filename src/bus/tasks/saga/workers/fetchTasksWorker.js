import { call, put } from 'redux-saga/effects';
import { ROOT_URL, TOKEN } from '../../../../config';
import { taskAction } from '../../actions';

export function* fetchTasksWorker () {
    try {
        const response = yield call(fetch, ROOT_URL, {
            method:  'GET',
            headers: {
                Authorization: TOKEN,
            },
        });
        const { data: tasks, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(taskAction.fetchTasksSuccess(tasks));
    } catch (error) {

    } finally {

    }
}
