import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [cast, setCast] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "f81eddcfa1fa92ba0e5bfe802029fb78";
        const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
        const options = {
          params: {
            api_key: apiKey,
          },
        };
        const response = await axios.get(castUrl, options);
        setCast(response.data.cast);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [movieId]);

  const handleClose = () => {
    navigate(-1); // Go back to the previous page
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Movie Cast</h2>
      <button onClick={handleClose}>Close</button>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
              className={styles.actorImage}
            />
            <div className={styles.actorInfo}>
              <p>{actor.name}</p>
              <p>as {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
