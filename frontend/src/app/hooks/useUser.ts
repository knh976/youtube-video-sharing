
import { useAppSelector } from './useApp';
import { getToken, getUsername } from '../helpers/cookies';
const useUser = () => {
  const user = useAppSelector((state) => state.user);
  const token = getToken() || user.token;
  const username = getUsername() || user.username;
  return {
    isAuth: !!token,
    token,
    username,
  };
};
export default useUser;
