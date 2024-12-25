import React, { useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';
import { openDrawer, setUser } from '@utils/slices/drawerSlice';
import { deleteUser } from '@utils/api/users';
import { setLoading, setUsers } from '@utils/slices/usersSlice';
import { TUser } from 'types/types';

const UserTable: React.FC = () => {
  const loading = useAppSelector((state: RootState) => state.users.loading);
  const users = useAppSelector((state: RootState) => state.users.users);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  const handleEdit = (user: TUser) => {
    dispatch(setUser(user));
    dispatch(openDrawer('Редактировать пользователя'));
  };

  const fetchDelete = (userId: number) => {
    setLoading(true);
    deleteUser(userId)
      .then(() => {
        message.success('Пользователь успешно удален');
      })
      .catch((error) => {
        console.error('Ошибка при удалении пользователя:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (userId: number) => {
    Modal.confirm({
      title: `Вы хотите удалить пользователя ${users.find((user) => user.id === userId)?.full_name}?`,
      onOk: () => {
        fetchDelete(userId);
        dispatch(setUsers(users.filter((user) => user.id !== userId))); // Удаляем пользователя из списка);
      },
    });
  };

  const columns = [
    {
      title: 'Аватар',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => (
        <img
          src={avatar}
          alt="avatar"
          style={{ borderRadius: '50%', width: 40 }}
        />
      ),
    },
    {
      title: 'ФИО пользователя',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Контактные данные',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Пол',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '',
      key: 'actions',
      render: (_: any, user: TUser) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="link" onClick={() => handleEdit(user)}>
            ✏️ Редактировать
          </Button>
          <Button type="link" danger onClick={() => handleDelete(user.id)}>
            🗑 Удалить
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={users.map((user) => ({ ...user, key: user.id }))}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default UserTable;
