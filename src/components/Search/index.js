import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';

class Search extends Component {

    render () {

        return (
            <Form model = 'forms.search.text'>
                <Control.input model = 'forms.search.text' />
            </Form>
        );
    }
}

export default Search;
