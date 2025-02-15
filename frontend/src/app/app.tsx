import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './app.module.scss';
import Header from './components/Header';
import HeaderLogin from './components/HeaderLogin';
import HeaderLoggedIn from './components/HeaderLoggedIn';
import Share from './components/Share';
import { ROUTES } from './constants';
import ListMovies from './components/ListMovies';
import useUser from './hooks/useUser';
import { useAppDispatch } from './hooks/useApp';
import { setLoggedIn } from './reducers/user';

export function App() {
  const dispatch = useAppDispatch();
  const { isAuth } = useUser();

  useEffect(() => {
    dispatch(setLoggedIn());
  }, []);

  return (
    <div className={styles.root}>
      <Header>{isAuth ? <HeaderLoggedIn /> : <HeaderLogin />}</Header>
      <Routes>
        <Route path={ROUTES.home} element={<ListMovies />} />
        <Route path={ROUTES.share} element={<Share />} />
      </Routes>
    </div>
  );
}

export default App;
