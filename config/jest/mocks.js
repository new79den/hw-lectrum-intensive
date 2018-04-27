const token = "TEST_TOKEN";
const errorMessage = 'TEST_SUCCESS_MESSAGE.';
const error = new Error(errorMessage);

const task = {
    "message": "the request has succeeded",
    "data": {
        "id": "5a7f136331a5d90001271638",
        "message": "Hello",
        "completed": false,
        "favorite": false,
        "created": "2018-02-10T15:44:35.284Z"
    }
};

const tasks = [
    {
        "id": "5a7f136231a5d90001271637",
        "message": "Hello!",
        "completed": true,
        "favorite": false,
        "created": "2018-02-10T15:44:34.624Z",
        "modified": "2018-02-10T16:01:12.406Z"
    },
    {
        "id": "5a7f136131a5d90001271636",
        "message": "Hello",
        "completed": false,
        "favorite": false,
        "created": "2018-02-10T15:44:33.675Z"
    },
    {
        "id": "5a7f136031a5d90001271635",
        "message": "Hello",
        "completed": false,
        "favorite": false,
        "created": "2018-02-10T15:44:32.959Z"
    }
];

const chooseAllTasks = [
    {
        "id": "5a7f136231a5d90001271637",
        "message": "Hello!",
        "completed": true,
        "favorite": false,
        "created": "2018-03-10T15:44:34.624Z",
        "modified": "2018-04-10T16:01:12.406Z"
    },
    {
        "id": "5a7f136131a5d90001271636",
        "message": "Hello",
        "completed": true,
        "favorite": false,
        "created": "2018-02-10T15:44:33.675Z",
        "modified": "2018-04-10T16:01:12.406Z"
    },
    {
        "id": "5a7f136031a5d90001271635",
        "message": "Hello",
        "completed": true,
        "favorite": false,
        "created": "2018-02-10T15:44:32.959Z",
        "modified": "2018-04-10T16:01:12.406Z"
    }
];

const updateTask =
    {
        "id": "5a7f136131a5d90001271636",
        "message": "test update",
        "completed": false,
        "favorite": false,
        "created": "2018-02-10T15:44:34.624Z",
        "modified": "2018-02-10T16:01:12.406Z"
    }
;

global.__ = {
    token,
    error,
    tasks,
    task,
    updateTask,
    chooseAllTasks,
};