import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

interface Props {
  children: React.ReactElement;
}
const Header = ({ children }: Props) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs="auto" container spacing={1}>
        <Grid item xs="auto">
          <HomeIcon sx={{ fontSize: 40 }} />
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h4">Funny Movies</Typography>
        </Grid>
      </Grid>
      <Grid item xs="auto">
        {children}
      </Grid>
      <Grid item xs={12}>
        <Box my={2}>
          <Divider />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Header;
