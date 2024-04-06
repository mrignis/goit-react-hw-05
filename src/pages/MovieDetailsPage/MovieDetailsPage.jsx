import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviewsPage from "../../components/MovieReview/MovieReviews";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [releaseYear, setReleaseYear] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleCastClick = () => {
    navigate(`/movies/${movieId}/cast`);
  };

  const handleReviewsClick = () => {
    navigate(`/movies/${movieId}/reviews`);
  };

  return (
    <div className={styles.container}>
      <div className={styles["movie-details"]}>
        <div>
          <h1>{movieDetails.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <p>{movieDetails.overview}</p>
          <p>Release Year: {releaseYear}</p>
          <p className={styles.genre}>
            Genre: {movieDetails.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className={styles.country}>
            Country:{" "}
            {movieDetails.production_countries
              .map((country) => country.name)
              .join(", ")}
          </p>
          <div className={styles.links}>
            <button onClick={handleCastClick}>View Cast</button>
            <button onClick={handleReviewsClick}>View Reviews</button>
          </div>
        </div>
        <div>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviewsPage />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
