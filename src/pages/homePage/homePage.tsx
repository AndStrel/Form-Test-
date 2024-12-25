import UserTable from '@components/table/tableUser';
import { openDrawer } from '@utils/slices/drawerSlice';
import { useAppDispatch } from '@utils/store';

import { Button } from 'antd';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const createUser = () => {
    dispatch(openDrawer('Добавить нового пользователя'));
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
