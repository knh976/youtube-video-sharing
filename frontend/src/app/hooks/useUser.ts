import { useAppSelector } from './useApp';

const useUser = () => {
  const { token, username } = useAppSelector((state) => state.user);

  return {
    isAuth: !!token,
    token,
    username,
  };
};

export default useUser;
