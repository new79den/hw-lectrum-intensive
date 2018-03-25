import React from "react"
import {func, string} from "prop-types"


function Search({setSearchText, searchText}) {
    return (
        <input onChange={setSearchText}  value={searchText}  type="text"/>

    )
}

Search.propoTypes = {
    setSearchText: func.isRequired,
    searchText: string.isRequired
};

export default Search;
