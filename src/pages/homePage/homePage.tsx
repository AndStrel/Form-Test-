import UserTable from '@components/table/tableUser';
import { openDrawer, setIsRedacting, setUser } from '@utils/slices/drawerSlice';
import { useAppDispatch } from '@utils/store';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from '@styles/components/button.module.scss';
import clsx from 'clsx';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const createUser = () => {
    dispatch(setIsRedacting(false));
    dispatch(setUser({}));
    dispatch(openDrawer());
  };

  return (
    <>
      <Button
        type="primary"
        className={clsx(styles.button__secondary)}
        icon={<PlusOutlined />}
        onClick={() => createUser()}
      >
        Добавить нового пользователя
      </Button>
      <UserTable />
    </>
  );
};
