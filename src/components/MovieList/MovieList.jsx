import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles["movie-list"]}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles["movie-item"]}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: location.pathname },
            }}
            className={styles["movie-link"]}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className={styles["movie-poster"]}
            />
            <div className={styles["movie-info"]}>
              <p className={styles["movie-title"]}>{movie.title}</p>
              <p className={styles["movie-release-year"]}>
                Release Year:{" "}
                {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
