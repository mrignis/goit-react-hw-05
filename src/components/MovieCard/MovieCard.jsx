import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-release-date">Release Date: {movie.release_date}</p>
        <p className="movie-overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
