import React from 'react'

const Search = (props) => {
    return (
        <>
            <div className="search-wrapper">
                <label>Live Search</label>
                <input id="search-text" name="search-text" type="text" placeholder="Search" value={props.searchTerm} onChange={props.handleChangeProp} />
            </div>
        </>
    )
}

export default Search
