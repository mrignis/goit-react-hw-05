// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import MovieList from "./../MovieList/MovieList";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    // Додайте код для отримання списку популярних фільмів з API TMDB
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={trendingMovies} />
    </div>
  );
}

export default HomePage;
