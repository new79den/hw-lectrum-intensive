import { addTaskWorker } from './../saga/workers/addTaskWorker';
import {call, put} from 'redux-saga/effects';
import {cloneableGenerator} from 'redux-saga/utils';
import { taskAction } from "./../actions";
import {ROOT_URL, TOKEN} from "../../../config";

const action = taskAction.addTask(__.task.message);
const saga = cloneableGenerator(addTaskWorker)(action);

describe('addTaskWorker', () => {

    test('should call a post request', () => {

        expect(saga.next().value).toEqual(
            call(fetch, ROOT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  TOKEN,
                },
                body: JSON.stringify(__.task.message)
            })
        );
    });

    test('should handle !== 200 response status', () => {
        const clone = saga.clone();

        expect(clone.next(__.fetchResponseFail).value).toEqual(call([__.fetchResponseFail, __.fetchResponseFail.json]));

        expect(clone.next(__.responseDataFall).value).toEqual(
            put(taskAction.addTaskFail(__.error)));

        expect(clone.next().done).toBe(true);
    });

    test('fetch request should valid response with successful data', () => {
        expect(saga.next(__.fetchResponseSuccess).value).toEqual(
            call([__.fetchResponseSuccess, __.fetchResponseSuccess.json])
        );
    });
    test('addTaskSuccess should contain a token', () => {
        expect(saga.next(__.fetchResponseSuccess).value).toEqual(
            put(taskAction.addTaskSuccess())
        );
    });
});