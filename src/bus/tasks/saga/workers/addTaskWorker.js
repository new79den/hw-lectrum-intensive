import { call, put } from 'redux-saga/effects';
import { ROOT_URL, TOKEN } from '../../../../config';
import { taskAction } from '../../actions';

export function* addTaskWorker ({ payload: text }) {

    try {

        const response = yield call(fetch, ROOT_URL, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify(text),
        });
        const { data: task, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(taskAction.addTaskSuccess(task));

    } catch (error) {
        yield put(taskAction.addTaskFail(error));
    }
}
