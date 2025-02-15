import React, { useEffect } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import MovieItem from './MovieItem';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { API_STATUSES } from '../../constants';
import { fetchListMovies } from '../../reducers/listMovies';

const ListMovies = () => {
  const dispatch = useAppDispatch();
  const isLoading =
    useAppSelector((state) => state.listMovies.status) === API_STATUSES.loading;
  const movies = useAppSelector((state) => state.listMovies.movies);

  useEffect(() => {
    dispatch(fetchListMovies());
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          p: 2,
          m: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Box mt={2} ml={15}>
      <Grid container spacing={3} justifyContent="center">
        {movies.map((item) => (
          <Grid item xs={12} key={item.id}>
            <MovieItem
              username={item.username}
              url={item.video_url}
              title={item.video_title}
              description={item.video_description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListMovies;
