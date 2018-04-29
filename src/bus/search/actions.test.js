import {taskAction} from './actions';
import types from './types';

describe('task actions:', () => {
    test(' changeText should produce a valid action creator', () => {
        expect(taskAction.changeText('TEXT')).toEqual({
            type: types.CHANGE_TEXT,
            payload: 'TEXT',
        });
    });
});