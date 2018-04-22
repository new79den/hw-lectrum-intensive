import types from "./types";

export const taskAction = Object.freeze({
    changeText: (text) => ({
        type: types.CHANGE_TEXT,
        payload: text
    })
});