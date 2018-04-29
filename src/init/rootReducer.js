import { combineReducers } from 'redux';
import tasks from '../bus/tasks/reducer';
import forms from './../bus/forms/reducer';

export const rootReducer = combineReducers({
    tasks,
    forms,
});
