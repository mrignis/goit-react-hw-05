import React, { useEffect } from "react";
const axios = require("axios");

/const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';

const options = {
  headers: {
	// Замість api_read_access_token вставте свій токен
    Authorization: 'f81eddcfa1fa92ba0e5bfe802029fb78'
  }
};

axios.get(url, options)
  .then(response => console.log(response))
  .catch(err => console.error(err));

