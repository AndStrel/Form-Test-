import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';
import { login } from '@slices/authSlice';
import { useEffect } from 'react';
import { HomePageUI } from '@ui/pages';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(login({ name: 'Sebastian', email: 'Sebastian@mail.ru' }));
  };
  // Если пользователь уже авторизован, перенаправляем его на страницу профиля
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <HomePageUI
      title="Главная страница"
      description="Добро пожаловать!"
      handleLogin={handleLogin}
    />
  );
};
