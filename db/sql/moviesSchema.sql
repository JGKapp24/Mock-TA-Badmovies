-- SET UP SCHEMA HERE

DROP DATABASE IF EXISTS badmovies;
CREATE DATABASE badmovies;

USE badmovies;


CREATE TABLE favoriteMovies (
  id INT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  release_date VARCHAR(12),
  vote_average DEC NOT NULL,
  poster_path VARCHAR(70)
);