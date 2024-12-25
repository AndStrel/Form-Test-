import { UserForm } from '@components/userForm';
import { HomePage } from '@pages/homePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserDrawer } from '@components/userDrawer/userDrawer';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';
import { closeDrawer, openDrawer, setUser } from '@utils/slices/drawerSlice';
export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector((state: RootState) => state.drawer.open);
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
