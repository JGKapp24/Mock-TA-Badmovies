const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre

    // https://www.themoviedb.org/account/signup
    // get your API KEY

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
    apiHelpers.get.movieList(req.query.genreId)
      .then(results => JSON.parse(results.body))
      .then(movies => {
        // console.log(movies);
        res.status(200).json({
          message: 'Got movies!',
          results: movies.results
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          message: 'Failed to get movies',
          error: err
        });
      });

    /* example data
    {
      "id": 697003,
      "vote_average": 0,
      "title": "Alia: A Bosniac Rhapsody",
      "release_date": "2008-05-10",
      "genre_ids": [
        28,
        18,
        36,
        53,
        10752
      ],
      "poster_path": "/aNYFlJmAf0ShhOWNr3Xgx4owwow.jpg"
    }
    */
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list

    apiHelpers.get.genreList()
      .then(results => JSON.parse(results.body))
      .then(genres => {
        // console.log(genres);
        res.status(200).json({
          message: 'Got genres!',
          results: genres
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          message: 'Failed to get genres',
          error: err
        });
      });

    // send back

  },
  saveMovie: (req, res) => {

  },
  deleteMovie: (req, res) => {

  }
}