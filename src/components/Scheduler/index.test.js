import React from "react"
import {configure, mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import Scheduler from "./index"


const props = {
    tasks : [{},{},{}]
};

configure({adapter : new Adapter});

const html = mount(<Scheduler/>);

describe('Scheduler: ', () => {

    test(`Should have `, ()=>{
        expect(result.find('footer')).toHaveLength(1);
    });

});