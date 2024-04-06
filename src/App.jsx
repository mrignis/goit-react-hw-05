import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviewsPage from "./components/MovieReview/MovieReviews";

const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = React.lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = React.lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = React.lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage")
);
const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route
            path="/movies/:movieId/*"
            element={<MovieDetailsPage />}
          />{" "}
          {/* Змінено шлях для відображення деталей фільму */}
          <Route path="/movies/:movieId/cast" element={<MovieCast />} />
          <Route
            path="/movies/:movieId/reviews"
            element={<MovieReviewsPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
