import { call, put } from 'redux-saga/effects';
import { ROOT_URL, TOKEN } from '../../../../config';
import { taskAction } from '../../actions';

export function* deleteTaskWorker ({ payload: id }) {
    try {
        const response = yield call(fetch, `${ROOT_URL}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            throw new Error('deleteTaskWorker no status 204');
        }

        yield put(taskAction.deleteTaskSuccess(id));
    } catch (error) {
        yield put(taskAction.deleteTaskFail(error));
    }
}
