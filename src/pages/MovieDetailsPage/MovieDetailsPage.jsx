import React, { useEffect, useState, useRef } from "react";
import { useParams, Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviewsPage from "../../components/MovieReview/MovieReviews";
import styles from "./MovieDetailsPage.module.css"; // Імпортуйте модульні стилі

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [releaseYear, setReleaseYear] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const prevLocationRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "f81eddcfa1fa92ba0e5bfe802029fb78";
        const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
        const options = {
          params: {
            api_key: apiKey,
          },
        };
        const response = await axios.get(movieDetailsUrl, options);
        setMovieDetails(response.data);
        setReleaseYear(response.data.release_date.substring(0, 4));
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [movieId]);

  useEffect(() => {
    // Save previous location
    prevLocationRef.current = location;
  }, [location]);

  const handleGoBack = () => {
    // Navigate back to previous location
    if (prevLocationRef.current) {
      window.history.back();
    }
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className={styles["button-group-top"]}>
        <button onClick={handleGoBack} className={styles.linkss}>
          Go Back
        </button>
      </div>
      <div>
        <h1>{movieDetails.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
        <p>{movieDetails.overview}</p>
        <p>Release Year: {releaseYear}</p>
        <p>
          Genre: {movieDetails.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          Country:{" "}
          {movieDetails.production_countries
            .map((country) => country.name)
            .join(", ")}
        </p>

        <div className={styles["button-group"]}>
          <Link to={`/movies/${movieId}/cast`} className={styles.linkss}>
            View Cast
          </Link>
          <Link to={`/movies/${movieId}/reviews`} className={styles.linkss}>
            View Reviews
          </Link>
        </div>

        <Routes>
          <Route path="/cast" element={<MovieCast />} />
          <Route path="/reviews" element={<MovieReviewsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
