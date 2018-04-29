import {deleteTaskWorker} from './../saga/workers/deleteTaskWorker';
import {call, put} from 'redux-saga/effects';
import {cloneableGenerator} from 'redux-saga/utils';
import {taskAction} from "./../actions";
import {ROOT_URL, TOKEN} from "../../../config";

const action = taskAction.deleteTask(__.task.data.id);
const saga = cloneableGenerator(deleteTaskWorker)(action);

describe('deleteTaskWorker', () => {

    test('should call a post request', () => {

        expect(saga.next().value).toEqual(
            call(fetch, `${ROOT_URL}/${__.task.data.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: TOKEN,
                },
            })
        );
    });

    test('should handle !== 204 response status', () => {
        const clone = saga.clone();


        expect(clone.next(__.responseDataFall).value).toEqual(
            put(taskAction.deleteTaskFail(new Error('deleteTaskWorker no status 204'))));

        expect(clone.next().done).toBe(true);
    });

    test('deleteTaskSuccess should contain a token', () => {
        expect(saga.next(__.fetchResponseSuccess_204).value).toEqual(
            put(taskAction.deleteTaskSuccess(__.task.data.id))
        );
    });
}); 