import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { LineWave } from "react-loader-spinner";

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
      <Suspense
        fallback={
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
