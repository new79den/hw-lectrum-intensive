import { combineReducers } from 'redux';
import  tasks from '../bus/tasks/reducer'

export const rootReducer = combineReducers({
    tasks
});