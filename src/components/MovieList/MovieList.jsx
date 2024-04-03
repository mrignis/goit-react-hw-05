// src/components/MovieList.jsx
import React from "react";

function MovieList({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
