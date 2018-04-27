import types from './types';

export const taskAction = Object.freeze({
    fetchTasks: () => ({
        type: types.FETCH_TASKS,
    }),
    fetchTasksSuccess: (tasks) => ({
        type:    types.FETCH_TASKS_SUCCESS,
        payload: tasks,
    }),
    fetchTasksFail: (error) => ({
        type:    types.FETCH_TASKS_FAIL,
        payload: error,
        error:   true,
    }),

    addTask: (text) => ({
        type:    types.ADD_TASK,
        payload: text,
    }),
    addTaskSuccess: (task) => ({
        type:    types.ADD_TASK_SUCCESS,
        payload: task,
    }),
    addTaskFail: (error) => ({
        type:    types.ADD_TASK_FAIL,
        payload: error,
        error:   true,
    }),

    editTask: (task) => ({
        type:    types.EDIT_TASK,
        payload: task,
    }),
    editTaskSuccess: (task) => ({
        type:    types.EDIT_TASK_SUCCESS,
        payload: task,
    }),
    editTaskFail: (error) => ({
        type:    types.EDIT_TASK_FAIL,
        payload: error,
        error:   true,
    }),

    deleteTask: (id) => ({
        type:    types.DELETE_TASK,
        payload: id,
    }),
    deleteTaskSuccess: (id) => ({
        type:    types.DELETE_TASK_SUCCESS,
        payload: id,
    }),
    deleteTaskFail: (error) => ({
        type:    types.DELETE_TASK_FAIL,
        payload: error,
        error:   true,
    }),

    chooseAllTask: (status) => ({
        type:    types.CHOOSE_ALL_TASKS,
        payload: status,
    }),
    chooseAllTasksSuccess: (tasks) => ({
        type:    types.CHOOSE_ALL_TASKS_SUCCESS,
        payload: tasks,
    }),
    chooseAllTaskFail: (error) => ({
        type:    types.CHOOSE_ALL_TASKS_FAIL,
        payload: error,
        error:   true,
    }),
});
