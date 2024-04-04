import React, { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";
import styles from "./MoviesPage.module.css"; // Імпорт CSS файлу
import { useSearchParams } from "react-router-dom";

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const apiKey = "f81eddcfa1fa92ba0e5bfe802029fb78";
        const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week`;
        const trendingOptions = {
          params: {
            api_key: apiKey,
          },
        };
        const response = await axios.get(trendingUrl, trendingOptions);
        setTrendingMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      setIsLoading(true);
      try {
        const apiKey = "f81eddcfa1fa92ba0e5bfe802029fb78";
        const searchUrl = `https://api.themoviedb.org/3/search/movie`;
        const options = {
          params: {
            api_key: apiKey,
            query: searchQuery,
          },
        };
        const response = await axios.get(searchUrl, options);
        setSearchResults(response.data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      searchMovies();
    }
  }, [searchQuery]);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", `?query=${searchQuery}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <form className={styles.form} onSubmit={handleSearchSubmit}>
        <input
          className={styles.input}
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>
      {searchResults.length > 0 && <MovieList movies={searchResults} />}
      <h2>Trending Movies</h2>
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
    </div>
  );
}

export default MoviesPage;
