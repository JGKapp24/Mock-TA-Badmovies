import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };

    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(genreId) {
    // make an axios request to your server on the GET SEARCH endpoint
    let url = `/movies/search${genreId ? `?genreId=${genreId}` : ''}`;

    fetch(url)
    .then(res => res.json())
    .then((results) => {
      this.setState({
        movies: results.results
      });
    })
    .catch(console.log);
  }

  getFavorites() {
    fetch('/movies/favorites')
      .then(res => res.json())
      .then(results => {
        console.log(results);
        this.setState({
          favorites: results.results
        });
      })
      .catch(console.log);
  }

  saveMovie(movie) {
    // same as above but do something diff
    fetch('/movies/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({movie})
    })
    .then(() => {
      this.getFavorites();
    })
    .catch(console.log);
  }

  deleteMovie(movieId) {
    // same as above but do something diff
    console.log('deleting movie id: ', movieId);
    fetch(`/movies/delete?movieId=${movieId}`, {method: 'DELETE'})
      .then(() => {
        this.getFavorites();
      })
      .catch(console.log);

  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header>

        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} searchMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies}
          showFaves={this.state.showFaves}
          saveMovie={this.saveMovie}
          deleteMovie={this.deleteMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));