import {call, put, select} from 'redux-saga/effects';
import {ROOT_URL, TOKEN} from "../../../../config";
import {taskAction} from "../../actions";

export function* chooseAllTasksWorker({payload: status}) {
    const tasks = yield select((state) => state.tasks);
    const obj = [];
    tasks.forEach(el => {
        obj.push({
            message: el.get('message'),
            id: el.get('id'),
            completed: status,
            favorite: el.get('favorite')
        })
    });

    try {
        const response = yield call(fetch, ROOT_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify(obj)
        });

        const {data, message} = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message)
        }

        yield put(taskAction.chooseAllTasksSuccess(data));
    } catch (error) {
    } finally {
    }
}