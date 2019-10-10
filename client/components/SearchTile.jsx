import React, { Component } from "react";

class SearchTile extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className='searchTile'>
                <h6>Title: {this.props.title}</h6>
                <p>Overview: {this.props.overview}</p>
                <p>Release Date: {this.props.releaseDate}</p>
                <button onClick={() => this.props.saveApi(this.props)}>Add to watchlist</button>
            </section>
        )
    }
}

export default SearchTile 