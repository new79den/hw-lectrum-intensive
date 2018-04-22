import {call, put, select} from 'redux-saga/effects';
import {ROOT_URL, TOKEN} from "../../../../config";
import {taskAction} from "../../actions";

export function* deleteTaskWorker({payload: id}) {
    try {
        const response = yield call(fetch, `${ROOT_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            }
        });

        if (response.status !== 204) {
            throw new Error(message)
        }

        yield put(taskAction.deleteTaskSuccess(id));

    } catch (error) {
    } finally {
    }
}