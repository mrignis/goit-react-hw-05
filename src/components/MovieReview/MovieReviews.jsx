import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function MovieReviewsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            params: {
              api_key: "f81eddcfa1fa92ba0e5bfe802029fb78",
            },
          }
        );
        setReviews(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Movie Reviews</h2>
      <button onClick={handleClose}>Close</button>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviewsPage;
