import React, { Component } from "react";

class MovieTile extends Component {
    constructor(props) {
        super(props)
    }    
    render() {
        return (
            <section className='movieTile'>
                <h3>Title: {this.props.title}</h3>
                <p>Genre: {this.props.genre}</p>
                <p>Overview: {this.props.overview}</p>
                <p>Rating: {this.props.averageVote}</p>
                <p>Release Date: {this.props.releaseDate}</p>
                <div>
                    <button>Watched</button>
                    <button>Delete</button>
                </div>
            </section>
        )
    }
}


export default MovieTile