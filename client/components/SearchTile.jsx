import React, { Component } from "react";

class SearchTile extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className='searchTile'>
                <h4><span>Title:</span> {this.props.title}</h4>
                <p><span>Overview:</span> {this.props.overview}</p>
                <p><span>Release Date:</span> {this.props.releaseDate}</p>
                <button onClick={() => this.props.saveApi(this.props)}>Add to watchlist</button>
            </section>
        )
    }
}

export default SearchTile 