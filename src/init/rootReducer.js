import { combineReducers } from 'redux';
import  tasks from '../bus/tasks/reducer';
import search from '../bus/search/reducer';
import forms from './../bus/forms/reducer';

export const rootReducer = combineReducers({
    tasks,
    search,
    forms,
});