import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import { ROUTES } from '../../constants';

const HeaderLoggedIn = () => {
  const username = 'admin@icebattery.com';

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
        <Button variant="outlined" fullWidth>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default HeaderLoggedIn;
