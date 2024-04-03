// src/App.jsx
import { lazy, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies" exact component={MoviesPage} />
            <Route path="/movies/:movieId" component={MovieDetailsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
