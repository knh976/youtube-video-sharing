import { COOKIE_KEYS } from '../constants';
import { Cookies } from 'react-cookie';

export const getToken = () => {
  const cookie = new Cookies();
  return cookie.get(COOKIE_KEYS.token);
};

export const getUsername = () => {
  const cookie = new Cookies();
  return cookie.get(COOKIE_KEYS.username);
};
