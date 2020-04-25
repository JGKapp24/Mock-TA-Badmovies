import React from 'react';

var MovieListItem = ({movie, handleClick}) =>{
  let year = movie.release_date;
  year = year ? year.substring(0,4) : 'N/A';

  return (
    <li className="movie_item">
          <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />
          <div className="movie_description">
            <h2>{movie.title}</h2>
            <section className="movie_details">
              <div className="movie_year">
                <span className="title">Year</span>
                <span>{year}</span>
              </div>
              <div className="movie_rating">
                <span className="title">Rating</span>
                <span>{movie.vote_average}</span>
              </div>
            </section>
          </div>
        </li>
  )
};

export default MovieListItem;