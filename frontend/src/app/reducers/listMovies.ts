import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_DOMAIN, API_STATUSES } from '../constants';

interface Movie {
  id: number;
  video_url: string;
  video_title: string;
  video_description: string;
  username: string;
}
interface ListMovieState {
  status: string;
  movies: Movie[];
}

export const fetchListMovies = createAsyncThunk('listMovies/get', async () => {
  const response = await axios.get(`${API_DOMAIN}/shared_videos`);
  return response.data;
});

const initialState: ListMovieState = {
  status: 'idle',
  movies: [],
};

export const listMoviesSlice = createSlice({
  name: 'listMovies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchListMovies.pending, (state) => {
        state.status = API_STATUSES.loading;
      })
      .addCase(fetchListMovies.fulfilled, (state, action) => {
        state.status = API_STATUSES.succeeded;
        state.movies = action.payload;
      })
      .addCase(fetchListMovies.rejected, (state) => {
        state.status = API_STATUSES.failed;
      });
  },
});

export const {} = listMoviesSlice.actions;

export default listMoviesSlice.reducer;
