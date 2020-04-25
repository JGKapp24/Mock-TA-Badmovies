import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selected: null
    };

    this.getGenres = this.getGenres.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.findGenreId = this.findGenreId.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    fetch('/movies/genres')
      .then(res => res.json())
      .then((results) => {
        this.setState({
          ['genres']: results.results.genres,
          selected: results.results.genres[0]
        });
      })
      .catch(console.log);
  }

  handleSelect(event) {
    this.setState({
      selected: {
        id: this.findGenreId(event.target.value),
        name: event.target.value
      }
    });
  }

  findGenreId(name) {
    for (let i = 0; i < this.state.genres.length; i++) {
      if (this.state.genres[i].name === name) {
        return this.state.genres[i].id;
      }
    }
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.handleSelect}>
          {this.state.genres.map((genre) => (
            <option value={genre.name} name={genre.id} key={genre.id}>{genre.name}</option>
          ))}
        </select>
        <br/><br/>

        <button>Search</button>

      </div>
    );
  }
}

export default Search;