//SELECT one db to work with
//For SQL
const sqlDb = require('../../db/sql/index.js');
//For Mongo
// const mongoDb = require('../../db/mongodb')

module.exports = {
  save: (movie) => {
    let {id, title, release_date, vote_average, poster_path} = movie;
    const sqlValues = {id, title, release_date, vote_average, poster_path};
    const sqlString = 'INSERT INTO favoriteMovies SET ?';

    return new Promise((resolve, reject) => {
      sqlDb.query(sqlString, sqlValues, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    });
  },

  delete: (movieId) => {
    const sqlString = 'DELETE FROM favoriteMovies WHERE id = ?';

    return new Promise((resolve, reject) => {
      sqlDb.query(sqlString, [movieId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getFavorites: () => {
    const sqlString = 'SELECT * FROM favoriteMovies';

    return new Promise((resolve, reject) => {
      sqlDb.query(sqlString, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}