import React, { useState } from 'react';
import { Table, Button, Modal, message } from 'antd';

interface User {
  id: number;
  avatar: string;
  fullName: string;
  email: string;
  gender: string;
  birthDate: string;
  role: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      avatar: 'https://via.placeholder.com/40',
      fullName: 'Казимир Антонина Р.',
      email: 'mail@mail.ru',
      gender: 'Женский',
      birthDate: '24.10.1998',
      role: 'Медсестра',
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (userId: number) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить пользователя?',
      onOk: () => {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
        message.success('Пользователь удален');
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
      dataIndex: 'fullName',
      key: 'fullName',
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
      render: (_: any, user: User) => (
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
      <Modal
        open={isModalVisible}
        title="Редактировать пользователя"
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {/* Здесь будет форма редактирования */}
        <p>Форма редактирования пользователя</p>
      </Modal>
    </div>
  );
};

export default UserTable;
