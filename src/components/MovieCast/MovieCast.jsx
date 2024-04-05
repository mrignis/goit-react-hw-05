import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Додайте імпорт useParams
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams(); // Отримання movieId через useParams
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const apiKey = "f81eddcfa1fa92ba0e5bfe802029fb78";
    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const options = {
      params: {
        api_key: apiKey,
      },
    };

    axios
      .get(castUrl, options)
      .then((response) => {
        setCast(response.data.cast);
      })
      .catch((error) => {
        console.error("Error fetching cast:", error);
      });
  }, [movieId]);

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
