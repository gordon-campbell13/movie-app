import React, { Component } from "react";

class MovieTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            watched: this.props.watched
        }
    }    
    
    render() {
        let watchedDiv;
        if (this.state.watched) {
            watchedDiv = <p>YOU WATCHED IT ALREADY!</p>
        } else {
            watchedDiv = <div></div>
        }

        return (
            <section className='movieTile'>
                <h3>Title: {this.props.title}</h3>
                <p>Genre: {this.props.genre}</p>
                <p>Overview: {this.props.overview}</p>
                <p>Rating: {this.props.averageVote}</p>
                <p>Release Date: {this.props.releaseDate}</p>
                <div>
                    {watchedDiv}
                </div>
                <div>
                    <button onClick={() => this.props.watchedCard(this.state.watched, this.props)}>Watched</button>
                    <button onClick={() => this.props.deleteCard(this.props)}>Delete</button>
                </div>
            </section>
        )
    }
}


export default MovieTile