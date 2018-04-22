import React from 'react'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Scheduler from './Scheduler'
import {filterTasks} from './Scheduler'
import {filterSearch} from './Scheduler'

const props = {
    tasks: [{
        'message': '3',
        'completed': false,
        'favorite': false,
    }, {
        'message': '2 search',
        'completed': false,
        'favorite': false,
    }, {
        'message': '1',
        'completed': false,
        'favorite': false,
    }]
};


it('Scheduler: filterTasks: completed', () => {
    const tasks = JSON.parse(JSON.stringify(props.tasks));
    tasks[0].completed = true;
    const result = filterTasks(tasks);
    const expected = [{
        'message': '2 search',
        'completed': false,
        'favorite': false,
    }, {
        'message': '1',
        'completed': false,
        'favorite': false,
    }, {
        'message': '3',
        'completed': true,
        'favorite': false,
    }];

    expect(result).toEqual(expected)
});

it('Scheduler: filterTasks: favorite', () => {
    const tasks = JSON.parse(JSON.stringify(props.tasks));
    tasks[2].favorite = true;
    const result = filterTasks(tasks);
    const expected = [{
        'message': '1',
        'completed': false,
        'favorite': true,
    }, {
        'message': '3',
        'completed': false,
        'favorite': false,
    }, {
        'message': '2 search',
        'completed': false,
        'favorite': false,
    }];

    expect(result).toEqual(expected)
});

it('Scheduler: filterSearch', () => {
    const tasks = JSON.parse(JSON.stringify(props.tasks));
    const result = filterSearch(tasks, 'search');
    const expected = [{
        'message': '2 search',
        'completed': false,
        'favorite': false,
    }];

    expect(result).toEqual(expected);
});