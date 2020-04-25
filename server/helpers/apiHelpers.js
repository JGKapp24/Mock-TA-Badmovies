const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');
const baseURL = 'https://api.themoviedb.org/3';

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

// Functions will return promises
module.exports = {
  get: {
    genreList: () => {
      return new Promise((resolve, reject) => {
        request(`${baseURL}/genre/movie/list?api_key=${API_KEY}&language=en-US`, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    },
    movieList: (genreId) => {
      let genreIdString = genreId ? `&with_genres=${genreId}` : '';
      return new Promise((resolve, reject) => {
        request(`${baseURL}/discover/movie?api_key=${API_KEY}${genreIdString}&sort_by=vote_average.asc&include_adult=false`, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    }
  }
}