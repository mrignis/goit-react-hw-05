// src/components/MovieCast/MovieCast.jsx
import React from "react";
import styles from "./MovieCast.module.css";

const MovieCast = ({ cast }) => {
  return (
    <div className={styles.container}>
      <h2>Movie Cast</h2>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
