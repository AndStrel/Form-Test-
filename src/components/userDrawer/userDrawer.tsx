import React from 'react';
import { Drawer } from 'antd';
import { UserForm } from '@components/userForm/userForm';

interface UserDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const UserDrawer: React.FC<UserDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer
      title="Добавить пользователя"
      placement="right"
      onClose={onClose}
      open={open}
      width={500}
    >
      <UserForm />
    </Drawer>
  );
};
