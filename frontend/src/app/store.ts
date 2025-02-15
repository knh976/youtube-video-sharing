import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import shareMovie from './reducers/shareMovie';
import listMovies from './reducers/listMovies';

const store = configureStore({
  reducer: {
    user,
    shareMovie,
    listMovies,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
