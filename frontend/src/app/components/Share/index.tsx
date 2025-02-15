import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { API_STATUSES, ROUTES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { shareMovie } from '../../reducers/shareMovie';
import useUser from '../../hooks/useUser';

const Share = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.shareMovie.status);
  const { isAuth } = useUser();
  const navigate = useNavigate();
  const [url, setUrl] = useState<string>('');

  const onChangeUrl = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUrl(event.target.value);
  };

  const onClickShare = async () => {
    if (!isAuth) {
      alert('Please login');
      return;
    }
    const response = await dispatch(shareMovie(url));
    // @ts-ignore
    const errorMessage = response?.error?.message;

    if (errorMessage) {
      alert(errorMessage);
    } else {
      navigate(ROUTES.home);
    }
  };

  return (
    <Box mt={10}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={9} lg={6}>
          <fieldset>
            <legend>Share a Youtube movie</legend>
            <Box py={4} px={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <Typography>Youtube URL:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      label="url"
                      size="small"
                      fullWidth
                      value={url}
                      onChange={onChangeUrl}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                  <Grid xs={3} />
                  <Grid item xs={8}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={onClickShare}
                      disabled={status === API_STATUSES.loading}
                    >
                      Share
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </fieldset>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Share;
