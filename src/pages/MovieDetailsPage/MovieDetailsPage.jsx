import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";
import MovieReviews from "../../components/MovieReview/MovieReviews";
import MovieCastPage from "../../components/MovieCast/MovieCast";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [releaseYear, setReleaseYear] = useState("");
  const [showAllCast, setShowAllCast] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const apiKey = "f81eddcfa1fa92ba0e5bfe802029fb78";
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const reviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
    const options = {
      params: {
        api_key: apiKey,
      },
    };

    axios
      .get(movieDetailsUrl, options)
      .then((response) => {
        setMovieDetails(response.data);
        setReleaseYear(response.data.release_date.substring(0, 4));
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });

    axios
      .get(castUrl, options)
      .then((response) => {
        setCast(response.data.cast);
      })
      .catch((error) => {
        console.error("Error fetching cast:", error);
      });

    axios
      .get(reviewsUrl, options)
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const toggleShowAllCast = () => {
    setShowAllCast(!showAllCast);
  };

  const toggleShowCast = () => {
    setShowCast(!showCast);
  };

  const toggleShowReviews = () => {
    setShowReviews(!showReviews);
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
      {showCast && (
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
      )}
      <Link to={`/movies/${movieId}/cast`} onClick={toggleShowCast}>
        {showCast ? "Hide Cast" : "Show Cast"}
      </Link>
      <h2>Reviews</h2>
      <div className={styles["reviews"]}>
        {showReviews && <MovieReviews reviews={reviews} />}
      </div>
      <Link to={`/movies/${movieId}/reviews`} onClick={toggleShowReviews}>
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </Link>
    </div>
  );
}

export default MovieDetailsPage;
