import React, { Component } from "react";

class MovieTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            watched: this.props.watched
        }
    }    
    
    watchedCard(watchState, nodeProps) {
        console.log('inside watchedCard function: ', watchState);
        const title = { 
            title: nodeProps.title,
            watched: watchState
        }
        console.log('this is title in watchedCard: ', typeof title)
        fetch('/movie', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(title)
        })
        .then( res => res.json() )
        .then( status => {
            this.setState({
                watched: status
            })
            // console.log('movies response obj!: ', movies)
        })
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
                <h3><span>Title:</span> {this.props.title}</h3>
                <p><span>Genre:</span> {this.props.genre}</p>
                <p><span>Overview:</span> {this.props.overview}</p>
                <p><span>Rating:</span> {this.props.averageVote}</p>
                <p><span>Release Date:</span> {this.props.releaseDate}</p>
                <div>
                    {watchedDiv}
                </div>
                <div>
                    <button onClick={() => this.watchedCard(this.state.watched, this.props)}>Watched</button>
                    <button className="delete" onClick={() => this.props.deleteCard(this.props)}>Delete</button>
                </div>
            </section>
        )
    }
}


export default MovieTile