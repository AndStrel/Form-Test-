import { HomePage } from '@pages/homePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserDrawer } from '@components/userDrawer/userDrawer';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';
import { closeDrawer } from '@utils/slices/drawerSlice';
import { setUsers } from '@utils/slices/usersSlice';

import { useEffect } from 'react';
import { start } from 'repl';
import { startUsers } from '@utils/constants';
import { TUser } from 'types/types';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector((state: RootState) => state.drawer.open);
  const users = useAppSelector((state: RootState) => state.users.users);

  // Загрузка данных из localStorage
  const readStoredUsers = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers === null) {
      return undefined;
    }
    try {
      return JSON.parse(storedUsers);
    } catch (e) {
      localStorage.removeItem('user');
      return undefined;
    }
  };

  if (readStoredUsers().length === 0) {
    dispatch(setUsers(startUsers));
  } else {
    // dispatch(setUsers(readStoredUsers()));
  }
  console.log(readStoredUsers());
  // dispatch(setUsers(startUsers));
  // useEffect(() => {
  //   localStorage.setItem('users', JSON.stringify(users));
  // }, [users, dispatch]);

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Router>
      <UserDrawer open={isDrawerOpen} onClose={handleDrawerClose} />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
