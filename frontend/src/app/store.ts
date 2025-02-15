import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import user from './reducers/user';
import shareMovie from './reducers/shareMovie';
import listMovies from './reducers/listMovies';

const rootReducer = combineReducers({
  user,
  shareMovie,
  listMovies,
});

export const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
