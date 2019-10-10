import React, { Component } from "react";
import MovieTile from "./components/MovieTile.jsx";
import Search from "./components/Search.jsx";
import SearchTile from "./components/SearchTile.jsx";
import './styles.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            savedMovies: [],
            searchMovies: []
        }
        this.searchApi = this.searchApi.bind(this);
        this.saveApi = this.saveApi.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.watchedCard = this.watchedCard.bind(this);
    }

    searchApi(event) {
        let userInput = event.target.search.value;
        let queryInput = userInput.replace(' ', '%20');
        // console.log('my api key: ', process.env.REACT_APP_MOVIEDB_API_KEY);
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&query=${queryInput}&page=1&include_adult=false`)
            .then( res => res.json())
            .then( apiMovies => {
                const movies = [];
                apiMovies.results.forEach( e => {
                    let movieObj = {
                        title: e.original_title,
                        overview: e.overview,
                        releaseDate: e.release_date,
                        averageVote: e.vote_average,
                        genre: (e.genre === undefined) ? 'Not labeled' : e.genre
                    }
                    movies.push(movieObj);
                })
                this.setState({
                    searchMovies: movies
                });
            })
        event.preventDefault();
    }

    saveApi(nodeProps) {
        let movie = {
            title: nodeProps.title,
            genre: nodeProps.genre,
            overview: nodeProps.overview,
            averageVote: nodeProps.averageVote,
            releaseDate: nodeProps.releaseDate
        }
        fetch('/movie', { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movie)
        })
        .then( res => res.json() )
        .then( movies => {
            this.setState({
                savedMovies: movies,
                searchMovies: []
            })
        })
    }

    deleteCard(nodeProps) {
        const title = { title: nodeProps.title }
        fetch('/movie', { 
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(title)
        })
        .then( res => res.json() )
        .then( movies => {
            this.setState({
                savedMovies: movies
            })
        })
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
        .then( movies => {
            this.setState({
                savedMovies: movies
            })
            // console.log('movies response obj!: ', movies)
        })
    }

    componentDidMount() {
        fetch('/movie')
            .then( res => res.json() )
            .then( movies => {
                this.setState({
                    savedMovies: movies
                });
            })
    }
    
    render() {
        const movies = this.state.savedMovies.map((el, ind) => {
            return <MovieTile
                key={ind} 
                title={el.title}
                genre={el.genre}
                overview={el.overview}
                averageVote={el.averageVote}
                releaseDate={el.releaseDate}
                watched={el.watched}
                deleteCard={this.deleteCard}
                watchedCard={this.watchedCard}
                />
        })
        let tempMovies
        if (this.state.searchMovies.length > 0) {
            tempMovies = this.state.searchMovies.map((el, ind) => {
                return <SearchTile 
                    key={ind}
                    title={el.title}
                    genre={el.genre}
                    overview={el.overview}
                    averageVote={el.averageVote}
                    releaseDate={el.releaseDate}
                    saveApi={this.saveApi}
                />
            })
        } else {
            tempMovies = <div className='emptySpace'></div>
        }
        return (
            <main>
                This is my main page for now
                <article className='searchSection'>
                    this will be the search section
                    <Search searchApi={this.searchApi}/>
                    <div className='tempMovies'>
                        {tempMovies}
                    </div>
                </article>
                <div className='favSection'>
                    {movies}
                </div>
            </main>
        )
    }
}

export default App;