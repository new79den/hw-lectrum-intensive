import React from "react";
import {configure, mount} from 'enzyme'
import Adapter from "enzyme-adapter-react-16"

import Footer from "./index";

configure({adapter: new Adapter()});

const props = {
    changeGlobalStateTasks: jest.fn(),
    isCheckAll : true
};

const result = mount(<Footer changeGlobalStateTasks={props.changeGlobalStateTasks} isCheckAll = {props.isCheckAll}/>);


describe('Footer: ', () => {

    test(`Should have 1 'section footer`, ()=>{
        expect(result.find('footer')).toHaveLength(1);
    });

    test(`Should have 1 'section Checkbox`, ()=>{
        expect(result.find('Checkbox')).toHaveLength(1);
    });

});

