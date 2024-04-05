import React from "react";
import { NavLink } from "react-router-dom"; // Заміна Link на NavLink
import styles from "./Navigation.module.css"; // Підключаємо стилі

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigationList}>
        <li className={styles.navigationItem}>
          <NavLink exact to="/" className={styles.link} activeClassName={styles.active}>
            Home
          </NavLink>
        </li>
        <li className={styles.navigationItem}>
          <NavLink to="/movies" className={styles.link} activeClassName={styles.active}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;