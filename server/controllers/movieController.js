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

  getFavorites: (req, res) => {
    movieModel.getFavorites()
      .then(results => {
        res.status(200).json({
          message: 'Retrieved favorites',
          results
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          message: 'Failed to get favorites',
          error: err
        })
      })
  },

  saveMovie: (req, res) => {
    if (req.body.movie) {

      movieModel.save(req.body.movie)
        .then(results => {
          res.status(200).json({
            message: 'Successfully saved movie to favorites!',
            results
          });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({
            message: 'Failed to save movie to favorites',
            error: err
          });
        });

    } else {
      res.status(400).json({
        message: 'bad request'
      });
    }
  },

  deleteMovie: (req, res) => {
    console.log(req.query.movieId);
    if (req.query.movieId) {

      movieModel.delete(req.query.movieId)
      .then(results => {
        res.status(200).json({
          message: 'Successfully deleted movie from favorites!',
          results
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          message: 'Failed to delete movie from favorites',
          error: err
        });
      });

    } else {
      res.status(400).json({
        message: 'bad request'
      });
    }
  }
}