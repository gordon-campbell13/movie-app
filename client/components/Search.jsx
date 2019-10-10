import React from 'react'

const Search = (props) => {
    return (
        <form className='searchBar' onSubmit={() => props.searchApi(event)}>
            <input className="inputField" name="search" type="text" placeholder="What movie do you want?!" value={event} />
            <input className="searchButton" type="submit" value="Submit me!" />
        </form>
    )
}

export default Search