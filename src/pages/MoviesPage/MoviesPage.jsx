import React, { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";
import styles from "./MoviesPage.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const searchMovies = async (query) => {
    setIsLoading(true);
    try {
      const apiKey = "f81eddcfa1fa92ba0e5bfe802029fb78";
      const searchUrl = `https://api.themoviedb.org/3/search/movie`;
      const options = {
        params: {
          api_key: apiKey,
          query: query,
        },
      };
      const response = await axios.get(searchUrl, options);
      setSearchResults(response.data.results);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSearchQuery(query);
    if (query !== "") {
      searchMovies(query);
    }
  }, [query]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`?query=${searchQuery}`);
  };

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <LineWave
          visible={true}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="line-wave-loading"
        />
      </div>
    );
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
      {searchQuery !== "" && searchResults.length > 0 && (
        <>
          <h2>Search Results</h2>
          <MovieList movies={searchResults} />
        </>
      )}
    </div>
  );
}

export default MoviesPage;
