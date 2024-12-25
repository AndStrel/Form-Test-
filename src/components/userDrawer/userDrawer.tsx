import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import { UserForm } from '@components/userForm/userForm';
import { RootState, useAppSelector } from '@utils/store';

interface DrawerProps {
  title?: string;
  open: boolean;
  onClose: () => void;
}

export const UserDrawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const title = useAppSelector((state: RootState) => state.drawer.title);

  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      open={open}
      width={500}
    >
      <UserForm />
    </Drawer>
  );
};
