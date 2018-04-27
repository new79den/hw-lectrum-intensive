import {taskAction} from '../actions';
import types from '../types';

describe('task actions:', () => {
    test(' fetchTasks should produce a valid action creator', () => {
        expect(taskAction.fetchTasks()).toEqual({
            type: types.FETCH_TASKS,
        });
    });
    test(' fetchTasks should produce a valid action creator', () => {
        expect(taskAction.fetchTasksSuccess(__.tasks)).toEqual({
            type: types.FETCH_TASKS_SUCCESS,
            payload: __.tasks,
        });
    });
    test(' fetchTasksFail should produce a valid action creator', () => {
        expect(taskAction.fetchTasksFail(__.error)).toEqual({
            type: types.FETCH_TASKS_FAIL,
            payload: __.error,
            error: true,
        });
    });

    test(' addTask should produce a valid action creator', () => {
        expect(taskAction.addTask(__.task.data.message)).toEqual({
            type: types.ADD_TASK,
            payload: __.task.data.message,
        });
    });
    test(' addTaskSuccess should produce a valid action creator', () => {
        expect(taskAction.addTaskSuccess(__.task)).toEqual({
            type: types.ADD_TASK_SUCCESS,
            payload: __.task,
        });
    });
    test(' addTaskFail should produce a valid action creator', () => {
        expect(taskAction.addTaskFail(__.error)).toEqual({
            type: types.ADD_TASK_FAIL,
            payload: __.error,
            error: true,
        });
    });

    test(' editTask should produce a valid action creator', () => {
        expect(taskAction.editTask(__.task)).toEqual({
            type: types.EDIT_TASK,
            payload: __.task,
        });
    });
    test(' editTaskSuccess should produce a valid action creator', () => {
        expect(taskAction.editTaskSuccess(__.task)).toEqual({
            type: types.EDIT_TASK_SUCCESS,
            payload: __.task,
        });
    });
    test(' editTaskFail should produce a valid action creator', () => {
        expect(taskAction.editTaskFail(__.error)).toEqual({
            type: types.EDIT_TASK_FAIL,
            payload: __.error,
            error: true,
        });
    });

    test(' deleteTask should produce a valid action creator', () => {
        expect(taskAction.deleteTask(__.task)).toEqual({
            type: types.DELETE_TASK,
            payload: __.task,
        });
    });
    test(' deleteTaskSuccess should produce a valid action creator', () => {
        expect(taskAction.deleteTaskSuccess(__.task)).toEqual({
            type: types.DELETE_TASK_SUCCESS,
            payload: __.task,
        });
    });
    test(' deleteTaskFail should produce a valid action creator', () => {
        expect(taskAction.deleteTaskFail(__.error)).toEqual({
            type: types.DELETE_TASK_FAIL,
            payload: __.error,
            error: true,
        });
    });

    test(' deleteTask should produce a valid action creator', () => {
        expect(taskAction.chooseAllTask(__.task)).toEqual({
            type: types.CHOOSE_ALL_TASKS,
            payload: __.task,
        });
    });
    test(' deleteTaskSuccess should produce a valid action creator', () => {
        expect(taskAction.chooseAllTasksSuccess(__.task)).toEqual({
            type: types.CHOOSE_ALL_TASKS_SUCCESS,
            payload: __.task,
        });
    });
    test(' deleteTaskFail should produce a valid action creator', () => {
        expect(taskAction.chooseAllTaskFail(__.error)).toEqual({
            type: types.CHOOSE_ALL_TASKS_FAIL,
            payload: __.error,
            error: true,
        });
    });
});