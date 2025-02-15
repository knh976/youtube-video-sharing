import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './app.module.scss';
import Header from './components/Header';
import HeaderLogin from './components/HeaderLogin';
import HeaderLoggedIn from './components/HeaderLoggedIn';
import Share from './components/Share';
import ListMovies from './components/ListMovies';
import { ROUTES } from './constants';

export function App() {
  const isLoggedIn = true;

  return (
    <div className={styles.root}>
      <Header>{isLoggedIn ? <HeaderLoggedIn /> : <HeaderLogin />}</Header>
      <Routes>
        <Route path={ROUTES.home} element={<ListMovies />} />
        <Route path={ROUTES.share} element={<Share />} />
      </Routes>
    </div>
  );
}

export default App;
