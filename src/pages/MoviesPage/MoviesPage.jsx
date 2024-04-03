// src/pages/MoviesPage.jsx
import React, { useState } from "react";
import MovieList from "../components/MovieList";

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    // Ваш код для пошуку фільмів за searchQuery
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
