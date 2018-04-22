import { call, put } from 'redux-saga/effects';
import { ROOT_URL, TOKEN } from '../../../../config';
import { taskAction } from '../../actions';

export function* editTaskWorker ({ payload: task }) {
    try {
        const response = yield call(fetch, ROOT_URL, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify([task]),
        });

        const { data, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }
        yield put(taskAction.editTaskSuccess(data[0]));
    } catch (error) {
    } finally {
    }
}
