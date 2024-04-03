// src/components/MovieReviews/MovieReviews.jsx
import React from "react";
import styles from "./MovieReviews.module.css";

const MovieReviews = ({ reviews }) => {
  return (
    <div className={styles.container}>
      <h2>Movie Reviews</h2>
      <ul className={styles.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.reviewItem}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
