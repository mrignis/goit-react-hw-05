import React, { useEffect, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from "axios";
import "./App.css"; // Додано імпорт для файлу CSS
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MovieCastPage from "./components/MovieCast/MovieCast"; // Змінено шлях для імпорту MovieCastPage
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const history = createBrowserHistory();

async function getTrendingMovies(apiKey) {
  try {
    const url = "https://api.themoviedb.org/3/trending/movie/week";
    const options = {
      params: {
        api_key: apiKey,
      },
    };
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
}

function App() {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const apiKey = "f81eddcfa1fa92ba0e5bfe802029fb78";
    getTrendingMovies(apiKey).then((movies) => {
      console.log("Trending movies:", movies);
    });
  }, []);

  return (
    <Router history={history}>
      <div>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route
              path="/movies/:movieId"
              element={<MovieDetailsPage setCast={setCast} />}
            />
            <Route
              path="/movies/:movieId/cast"
              element={<MovieCastPage cast={cast} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
