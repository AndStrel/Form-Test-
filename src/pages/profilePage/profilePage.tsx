import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store/store';
import { useEffect } from 'react';
import { ProfilePageUI } from '@ui/pages';
import { logout } from '@slices/authSlice';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector(
    (state: RootState) => state.auth,
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  // Если пользователь не авторизован, перенаправляем его на главную страницу
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <ProfilePageUI
      title="Профиль"
      description="Проходи не стесняйся!"
      name={user?.name}
      handleLogout={handleLogout}
    />
  );
};
