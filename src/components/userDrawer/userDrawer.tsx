import React, { useEffect, useState } from 'react';
import { Drawer, Typography } from 'antd';
import { UserForm } from '@components/userForm/userForm';
import { RootState, useAppSelector } from '@utils/store';
import { TUser } from 'types/types';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { StyleEnum } from '@utils/constants';

interface DrawerProps {
  title?: string;
  open: boolean;
  onClose: () => void;
}
const { Text } = Typography;

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

  return (
    <>
      <Drawer
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                fontFamily: StyleEnum.fontFamily,
                fontSize: '26px',
              }}
            >
              {isRedacting && open
                ? 'Редактировать пользователя'
                : 'Добавить нового пользователя'}
            </p>
            <CloseOutlined type="primary" onClick={onClose} />
          </div>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        styles={{
          wrapper: { width: '45%' },
          header: { display: 'flex', justifyContent: 'space-between' },
          content: {
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
          },
        }}
      >
        {!isRedacting && open && (
          <Text style={{ fontSize: '20px', fontFamily: StyleEnum.fontFamily }}>
            Найти в списке
          </Text>
        )}

        <UserForm user={user} />
      </Drawer>
    </>
  );
};
