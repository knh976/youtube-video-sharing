import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { red, grey } from '@mui/material/colors';
import ReactPlayer from 'react-player';

interface Props {
  username: string;
  url: string;
  title: string;
  description: string;
}

const MoveItem = ({ username, url, title, description }: Props) => (
  <Grid container spacing={2}>
    <Grid item xs="auto">
      <ReactPlayer url={url} controls={true} width="445px" height="250px" />
    </Grid>
    <Grid item xs={true}>
      <Box>
        <Typography
          variant="h6"
          style={{ color: red[500], overflow: 'hidden', maxHeight: 32 }}
        >
          <strong>{title}</strong>
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1">
          {`Shared by: `} <strong>{username}</strong>
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1">Description:</Typography>
      </Box>
      <Box>
        <Typography
          variant="body2"
          style={{ color: grey[600], overflow: 'hidden', maxHeight: 160 }}
        >
          {description}
        </Typography>
      </Box>
    </Grid>
  </Grid>
);

export default MoveItem;
