import React, { useState } from 'react';
import { Table, Button, Modal, message, Input } from 'antd';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';
import { openDrawer, setUser, setIsRedacting } from '@utils/slices/drawerSlice';
import { deleteUser } from '@utils/api/users';
import { deleteUserInState } from '@utils/slices/usersSlice';
import { TUser } from 'types/types';

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);
  const [searchValue, setSearchValue] = useState('');

  const handleEdit = (user: TUser) => {
    dispatch(setUser(user));
    dispatch(setIsRedacting(true));
    dispatch(openDrawer());
  };

  const fetchDelete = (userId: number) => {
    deleteUser(userId)
      .then(() => {
        message.success('Пользователь успешно удален');
        dispatch(deleteUserInState(userId));
      })
      .catch((error) => {
        console.error('Ошибка при удалении пользователя:', error);
      });
  };

  const handleDelete = (userId: number) => {
    Modal.confirm({
      title: `Вы хотите удалить пользователя ${users.find((user) => user.id === userId)?.full_name}?`,
      onOk: () => {
        fetchDelete(userId);
      },
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase().trim());
  };

  // Фильтрация данных
  const filteredUsers = users.filter((user) =>
    user.last_name.toLowerCase().includes(searchValue),
  );
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
      sorter: (a: TUser, b: TUser) =>
        a.full_name?.localeCompare(b.full_name?.toLowerCase() || '') || 0,
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
      sorter: (a: TUser, b: TUser) =>
        a.gender?.localeCompare(b.gender?.toLowerCase() || '') || 0,
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birthDate',
      key: 'birthDate',
      sorter: (a: TUser, b: TUser) =>
        a.birthDate?.localeCompare(b.birthDate?.toLowerCase()),
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
            ✏️
          </Button>
          <Button type="link" danger onClick={() => handleDelete(user.id)}>
            🗑
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Input.Search
        placeholder="Поиск по фамилии"
        onChange={handleSearchChange}
        style={{ marginBottom: 16 }}
      />
      <Table
        dataSource={filteredUsers.map((user) => ({
          ...user,
          key: user.id, // Генерируем уникальный ключ
        }))}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default UserTable;
