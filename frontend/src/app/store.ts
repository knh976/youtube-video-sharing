import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import shareMovie from './reducers/shareMovie';

const store = configureStore({
  reducer: {
    user,
    shareMovie,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
