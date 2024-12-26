import { HomePage } from '@pages/homePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserDrawer } from '@components/userDrawer/userDrawer';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';
import { closeDrawer } from '@utils/slices/drawerSlice';
import { setUsers } from '@utils/slices/usersSlice';

import { useEffect } from 'react';
import { start } from 'repl';
import { startUsers } from '@utils/constants';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector((state: RootState) => state.drawer.open);

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };
  // dispatch(setUsers(startUsers));
  // useEffect(() => {
  //   dispatch(setUsers(startUsers));
  // }, [dispatch]);

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
