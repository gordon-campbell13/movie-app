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
                        genre: 'not sure'
                    }
                    movies.push(movieObj);
                })
                this.setState({
                    searchMovies: movies
                });
            })
        event.preventDefault();
    }

    componentDidMount() {
        fetch('/movie')
            .then( res => res.json())
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
                />
        })
        let tempMovies
        if (this.state.searchMovies.length > 0) {
            tempMovies = this.state.searchMovies.map((el, ind) => {
                return <SearchTile 
                    key={ind}
                    title={el.title}
                    overview={el.overview}
                    releaseDate={el.releaseDate}
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