import React, { useState } from 'react';
import { Box, Button, Collapse, Grid, Paper, Typography } from '@mui/material';
import { red, grey } from '@mui/material/colors';
import ReactPlayer from 'react-player';

export const MAX_LINE_SHORT_DESC = 7;

interface Props {
  username: string;
  url: string;
  title: string;
  description: string;
}

const DescLine = ({ text }: { text: string }) => (
  <>
    {text}
    <br />
  </>
);

const MoveItem = ({ username, url, title, description }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const descLines = description.split('\\n');

  const toggleLoadMore = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs="auto">
        <ReactPlayer url={url} controls={true} width="445px" height="250px" />
      </Grid>
      <Grid item xs={true}>
        <Box>
          <Typography variant="h6" style={{ color: red[500] }}>
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
          <Typography variant="body2" style={{ color: grey[600] }}>
            {descLines.slice(0, MAX_LINE_SHORT_DESC).map((item) => (
              <DescLine text={item} />
            ))}
            <Collapse in={expanded}>
              {descLines.slice(MAX_LINE_SHORT_DESC).map((item) => (
                <DescLine text={item} />
              ))}
            </Collapse>
          </Typography>
          <Button variant="text" size="small" onClick={toggleLoadMore}>
            Load more
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MoveItem;
