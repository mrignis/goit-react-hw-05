// src/pages/MovieDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Ваш код для отримання детальної інформації про фільм за movieId
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movieDetails.title}</h1>
      <p>{movieDetails.overview}</p>
      {/* Додайте інші деталі про фільм */}
    </div>
  );
}

export default MovieDetailsPage;
