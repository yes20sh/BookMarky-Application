import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../redux/store';
import { login, logout } from '../redux/slices/authSlice';

export const useAuthReducer = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const username = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch();

  return {
    user: userId && username ? { userId, username } : null,
    login: (user: { userId: string; username: string }) => dispatch(login(user)),
    logout: () => dispatch(logout()),
  };
};
