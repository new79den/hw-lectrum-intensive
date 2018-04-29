import { fetchTasksWorker } from './../saga/workers/fetchTasksWorker';
import {call, put} from 'redux-saga/effects';
import {cloneableGenerator} from 'redux-saga/utils';
import { taskAction } from "./../actions";
import {ROOT_URL, TOKEN} from "../../../config";

const action = taskAction.fetchTasks(__.task.message);
const saga = cloneableGenerator(fetchTasksWorker)(action);

describe('fetchTasksWorker', () => {
    test('should call a post request', () => {
        expect(saga.next().value).toEqual(
            call(fetch, ROOT_URL, {
                method: 'GET',
                headers: {
                    Authorization:  TOKEN,
                },
            })
        );
    });

    test('should handle !== 200 response status', () => {
        const clone = saga.clone();

        expect(clone.next(__.fetchResponseFail).value).toEqual(call([__.fetchResponseFail, __.fetchResponseFail.json]));

        expect(clone.next(__.responseDataFall).value).toEqual(
            put(taskAction.fetchTasksFail(__.error)));

        expect(clone.next().done).toBe(true);
    });

    test('fetch request should valid response with successful data', () => {
        expect(saga.next(__.fetchResponseSuccess).value).toEqual(
            call([__.fetchResponseSuccess, __.fetchResponseSuccess.json])
        );
    });
    test('addTaskSuccess should contain a token', () => {
        expect(saga.next(__.fetchResponseSuccess).value).toEqual(
            put(taskAction.fetchTasksSuccess())
        );
    });
});