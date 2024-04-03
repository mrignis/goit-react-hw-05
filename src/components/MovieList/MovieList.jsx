import React from "react";
import { Link } from "react-router-dom"; // Імпорт NavLink або Link

import styles from "./MovieList.module.css"; // Імпортуємо CSS для стилізації

function MovieList({ movies }) {
  return (
    <ul className={styles["movie-list"]}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles["movie-item"]}>
          {/* Додайте посилання на сторінку деталей фільму */}
          <Link to={`/movies/${movie.id}`} className={styles["movie-link"]}>
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
