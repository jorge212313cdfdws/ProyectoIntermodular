import React from 'react';
import styles from './Header.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1>Taller Mecánico</h1>
      <nav>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </nav>
    </header>
  );
}

export default Header;
