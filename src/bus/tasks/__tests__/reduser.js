// Core
import { taskAction } from '../actions';
import  reducer  from '../reducer';
import { fromJS } from 'immutable';


describe('tasks reducer:', () => {
    test('should return initial state', () => {
        expect(reducer(void 0, {})).toMatchSnapshot();
    });
    test('should handle fetchTasksSuccess action', () => {
        expect(reducer(void 0, taskAction.fetchTasksSuccess(__.tasks))).toMatchSnapshot();
    });
    test('should handle addTaskSuccess action', () => {
        expect(reducer(fromJS(__.tasks), taskAction.addTaskSuccess(__.task))).toMatchSnapshot();
    });
    test('should handle deleteTaskSuccess action', () => {
        expect(reducer(fromJS(__.tasks), taskAction.deleteTaskSuccess(__.tasks[0].id))).toMatchSnapshot();
    });
    test('should handle editTaskSuccess action', () => {
        expect(reducer(fromJS(__.tasks), taskAction.editTaskSuccess(__.updateTask))).toMatchSnapshot();
    });
    test('should handle chooseAllTasksSuccess action', () => {
        expect(reducer(fromJS(__.tasks), taskAction.chooseAllTasksSuccess(__.chooseAllTasks))).toMatchSnapshot();
    });
});