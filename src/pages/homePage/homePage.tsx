import UserTable from '@components/table/tableUser';
import { openDrawer, setIsRedacting, setUser } from '@utils/slices/drawerSlice';
import { useAppDispatch } from '@utils/store';

import { Button } from 'antd';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const createUser = () => {
    dispatch(setIsRedacting(false));
    dispatch(setUser({}));
    dispatch(openDrawer());
  };

  return (
    <>
      <Button type="primary" onClick={() => createUser()}>
        Создать нового пользователя
      </Button>
      <UserTable />
    </>
  );
};
