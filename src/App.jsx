import React, { useEffect, useState, Suspense } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from "axios";
import "./App.css"; // Імпортуємо файл стилів CSS
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MovieCastPage from "./components/MovieCast/MovieCast"; // Імпортуємо компонент MovieCastPage
import MovieReviews from "./components/MovieReview/MovieReviews"; // Імпортуємо компонент MovieReviews
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
    console.error("Помилка при завантаженні популярних фільмів:", error);
    return [];
  }
}

function App() {
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const apiKey = "f81eddcfa1fa92ba0e5bfe802029fb78";
    getTrendingMovies(apiKey).then((movies) => {
      console.log("Популярні фільми:", movies);
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
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
