import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { UserForm } from '@components/userForm/userForm';
import { RootState, useAppSelector } from '@utils/store';
import { TUser } from 'types/types';
import styles from '@styles/components/drawer.module.scss';
import clsx from 'clsx';

interface DrawerProps {
  title?: string;
  open: boolean;
  onClose: () => void;
}

export const UserDrawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const isRedacting = useAppSelector(
    (state: RootState) => state.drawer.isRedacting,
  );

  const userFromState = useAppSelector((state: RootState) => state.drawer.user);
  const [user, setUser] = useState<TUser | undefined>(undefined);

  // Обновляем значения в форме при изменении isRedacting или userFromState
  useEffect(() => {
    if (isRedacting) {
      setUser(userFromState);
    } else {
      setUser(undefined); // Сбрасываем данные при добавлении нового пользователя
    }
  }, [isRedacting, userFromState]);

  const title = isRedacting
    ? 'Редактировать пользователя'
    : 'Добавить нового пользователя';
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      open={open}
      classNames={{
        wrapper: clsx(styles.drawerWrapper),
        content: clsx(styles.drawerContent),
        header: clsx(styles.drawerHeader),
        body: clsx(styles.drawerBody),
      }}
    >
      <p className={styles.drawerDescription}>Найти в списке</p>
      <UserForm user={user} />
    </Drawer>
  );
};
