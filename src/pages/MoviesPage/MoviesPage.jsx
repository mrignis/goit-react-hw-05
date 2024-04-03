import React, { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
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
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && <MovieList movies={searchResults} />}
    </div>
  );
}

export default MoviesPage;
