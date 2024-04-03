import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css"; // Імпорт CSS для стилізації

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [releaseYear, setReleaseYear] = useState("");
  const [showAllCast, setShowAllCast] = useState(false);

  useEffect(() => {
    const apiKey = "f81eddcfa1fa92ba0e5bfe802029fb78";
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const options = {
      params: {
        api_key: apiKey,
      },
    };

    // Запит для отримання детальної інформації про фільм
    axios
      .get(movieDetailsUrl, options)
      .then((response) => {
        setMovieDetails(response.data);
        setReleaseYear(response.data.release_date.substring(0, 4));
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });

    // Запит для отримання списку акторів
    axios
      .get(castUrl, options)
      .then((response) => {
        setCast(response.data.cast);
      })
      .catch((error) => {
        console.error("Error fetching cast:", error);
      });
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  // Функція для зміни стану показу всіх акторів
  const toggleShowAllCast = () => {
    setShowAllCast(!showAllCast);
  };

  return (
    <div className={styles["movie-details-container"]}>
      <h1>{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        alt={movieDetails.title}
        className={styles["movie-poster"]}
      />
      <p>{movieDetails.overview}</p>
      <p>Release Year: {releaseYear}</p>
      <p>Genre: {movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
      <p>
        Country:{" "}
        {movieDetails.production_countries
          .map((country) => country.name)
          .join(", ")}
      </p>
      <h2>Cast</h2>
      <ul className={styles["cast-list"]}>
        {showAllCast
          ? cast.map((actor) => (
              <li key={actor.id} className={styles["cast-list-item"]}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.name}
                  className={styles["actor-image"]}
                />
                <p>{actor.name}</p>
              </li>
            ))
          : cast.slice(0, 5).map((actor) => (
              <li key={actor.id} className={styles["cast-list-item"]}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.name}
                  className={styles["actor-image"]}
                />
                <p>{actor.name}</p>
              </li>
            ))}
      </ul>
      {!showAllCast && <button onClick={toggleShowAllCast}>Show All</button>}
    </div>
  );
}

export default MovieDetailsPage;
