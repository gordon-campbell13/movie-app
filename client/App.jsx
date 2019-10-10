import React, { Component } from "react";
import MovieTile from "./components/MovieTile.jsx";
import Search from "./components/Search.jsx";
import './styles.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            savedMovies: [],
            newMovies: []
        }
        this.searchApi = this.searchApi.bind(this);
    }

    searchApi(event) {
        
        console.log('this is event obj: ', event.target.search.value)
        console.log('did i run?')
        event.preventDefault();
    }

    componentDidMount() {
        fetch('/movie')
            .then( res => res.json())
            .then( movies => {
                console.log(movies);
                this.setState({
                    savedMovies: movies
                });
                // console.log(this.state.savedMovies);
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
        return (
            <main>
                This is my main page for now
                <article className='searchSection'>
                    this will be the search section
                    <Search searchApi={this.searchApi}/>
                </article>
                <div className='favSection'>
                    {movies}
                </div>
            </main>
        )
    }
}

export default App;