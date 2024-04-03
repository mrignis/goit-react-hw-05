import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";

import "./HomePage.module.css"; // Імпортуємо CSS файл для стилізації

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const apiKey = "f81eddcfa1fa92ba0e5bfe802029fb78";
    const accessToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODFlZGRjZmExZmE5MmJhMGU1YmZlODAyMDI5ZmI3OCIsInN1YiI6IjY2MGNmOTY2MGI1ZmQ2MDE2MjM3NWZlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G4XiUZnPrru6XVLHRosZqK7WhlTdihtfxDCz9fQo0p4";
    const url = "https://api.themoviedb.org/3/trending/movie/week";

    axios
      .get(url, {
        params: {
          api_key: apiKey,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setTrendingMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching trending movies:", error);
      });
  }, []);

  return (
    <div className="home-page-container">
      <h1 className="home-page-title">Trending Movies</h1>
      <MovieList movies={trendingMovies} />
    </div>
  );
}

export default HomePage;
