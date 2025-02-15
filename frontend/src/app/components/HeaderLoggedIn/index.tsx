import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import { ROUTES } from '../../constants';
import useUser from '../../hooks/useUser';
import { useAppDispatch } from '../../hooks/useApp';
import { logout } from 'src/app/reducers/user';

const HeaderLoggedIn = () => {
  const dispatch = useAppDispatch();
  const { username } = useUser();

  const handleLogout = () => dispatch(logout());

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item xs="auto" container alignItems="center">
        <Typography variant="body1">Welcome {username}</Typography>
      </Grid>
      <Grid item xs="auto">
        <Link to={ROUTES.share}>
          <Button variant="outlined" fullWidth>
            Share a movie
          </Button>
        </Link>
      </Grid>
      <Grid item xs="auto">
        <Button variant="outlined" fullWidth onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default HeaderLoggedIn;
