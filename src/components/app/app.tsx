import { HomePage } from '@pages/homePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserDrawer } from '@components/userDrawer/userDrawer';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';
import { closeDrawer } from '@utils/slices/drawerSlice';
import { setLoading, setUsers } from '@utils/slices/usersSlice';

import { useEffect } from 'react';
import { startUsers } from '@utils/constants';
import { TUser } from 'types/types';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector((state: RootState) => state.drawer.open);
  const loading = useAppSelector((state: RootState) => state.users.loading);

  // Чтение пользователей из localStorage
  const loadUsersFromLocalStorage = (): TUser[] => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        return JSON.parse(storedUsers);
      } catch {
        console.error('Ошибка при парсинге пользователей из localStorage');
        localStorage.removeItem('users'); // Удаляем некорректные данные
      }
    }
    return startUsers; // Если данных нет, возвращаем шаблонных
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const users = loadUsersFromLocalStorage();
    dispatch(setUsers(users));
    dispatch(setLoading(false));
  }, [dispatch]);

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <UserDrawer open={isDrawerOpen} onClose={handleDrawerClose} />
      <Routes>
        <Route path="/Form-Test/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};
