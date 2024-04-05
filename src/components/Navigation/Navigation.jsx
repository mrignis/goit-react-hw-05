import React from "react";
import { Link } from "react-router-dom"; // Заміна NavLink на Link
import styles from "./Navigation.module.css"; // Підключаємо стилі

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigationList}>
        <li className={styles.navigationItem}>
          <Link to="/" className={styles.link} aria-current="page">
            {" "}
            {/* Замінено на Link */}
            Home
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/movies" className={styles.link}>
            {" "}
            {/* Замінено на Link */}
            Movies
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
