import types from './types';

const initialState = '';

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_TEXT :
            return action.payload;
        default : return state
    }
}