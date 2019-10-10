import React from 'react'

const Search = (props) => {
    return (
        <form onSubmit={() => props.searchApi(event)}>
            <input name="search" type="text" placeholder="What movie do you want?!" value={event} />
            <input type="submit" value="Submit me!" />
        </form>
    )
}

export default Search