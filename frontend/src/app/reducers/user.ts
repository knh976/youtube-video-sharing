import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_DOMAIN, API_STATUSES, COOKIE_KEYS } from '../constants';
import { Cookies } from 'react-cookie';
import { LoginFormProps } from '../components/HeaderLogin';
import { getToken, getUsername } from '../helpers/cookies';

interface UserState {
  status: string;
  token?: string;
  username?: string;
}

export const fetchLogin = createAsyncThunk(
  'user/login',
  async (loginForm: LoginFormProps) => {
    const response = await axios.post(`${API_DOMAIN}/login`, loginForm);
    const { jwt, username } = response.data;
    const cookie = new Cookies();
    cookie.set(COOKIE_KEYS.token, jwt);
    cookie.set(COOKIE_KEYS.username, username);
    return { jwt, username };
  }
);

const initialState: UserState = {
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.token = getToken();
      state.username = getUsername();
    },
    logout: (state) => {
      const cookie = new Cookies();
      cookie.remove(COOKIE_KEYS.token);
      cookie.remove(COOKIE_KEYS.username);
      state.token = undefined;
      state.username = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = API_STATUSES.loading;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = API_STATUSES.succeeded;
        state.token = action.payload.jwt;
        state.username = action.payload.username;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = API_STATUSES.failed;
      });
  },
});

export const { setLoggedIn, logout } = userSlice.actions;

export default userSlice.reducer;
