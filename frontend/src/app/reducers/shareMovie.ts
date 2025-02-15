import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_DOMAIN, API_STATUSES } from '../constants';
import { getToken } from '../helpers/cookies';

interface ShareMovieState {
  status: string;
}

export const shareMovie = createAsyncThunk(
  'shareMovie/create',
  async (url: string) => {
    const response = await axios.post(
      `${API_DOMAIN}/shared_videos`,
      { url },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    return response.data;
  }
);

const initialState: ShareMovieState = {
  status: 'idle',
};

export const shareMovieSlice = createSlice({
  name: 'shareMovie',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(shareMovie.pending, (state) => {
        state.status = API_STATUSES.loading;
      })
      .addCase(shareMovie.fulfilled, (state) => {
        state.status = API_STATUSES.succeeded;
      })
      .addCase(shareMovie.rejected, (state) => {
        state.status = API_STATUSES.failed;
      });
  },
});

export const {} = shareMovieSlice.actions;

export default shareMovieSlice.reducer;
