import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css"; // Підключаємо стилі

function Navigation() {
  return (
    <nav>
      <ul className={styles.navigationList}>
        <li className={styles.navigationItem}>
          <NavLink exact="true" to="/" activeclassname={styles.active}>
            Home
          </NavLink>
        </li>
        <li className={styles.navigationItem}>
          <NavLink to="/movies" activeclassname={styles.active}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
