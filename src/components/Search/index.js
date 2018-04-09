import React from 'react';
import { func, string } from 'prop-types';


function Search ({ setSearchText, searchText }) {

    return (
        <input
            type = 'text'
            value = { searchText }
            onChange = { setSearchText }
        />
    );
}

Search.propoTypes = {
    setSearchText: func.isRequired,
    searchText:    string.isRequired,
};

export default Search;
