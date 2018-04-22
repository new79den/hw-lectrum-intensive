//Core
import {List, fromJS} from "immutable";
// Instruments
import types from './types';

const initialState = List([]);

export default (state = initialState, action) => {
    switch (action.type) {

        case types.FETCH_TASKS_SUCCESS:
            return fromJS(action.payload);

        case types.ADD_TASK_SUCCESS:
            return state.unshift(fromJS(action.payload));

        case types.DELETE_TASK_SUCCESS:
            return state.filter(el => el.get('id') !== action.payload);

        case types.EDIT_TASK_SUCCESS:
            const indexOfListToUpdate = state.findIndex(el => el.get('id') === action.payload.id);
            return state.update(indexOfListToUpdate, el => {
                return el.set("message", action.payload.message)
                    .set('completed', action.payload.completed)
                    .set('favorite', action.payload.favorite)
                    .set('modified', action.payload.modified);
            });

        case types.CHOOSE_ALL_TASKS_SUCCESS:
            return state.merge(fromJS(action.payload));

        default:
            return state
    }
}