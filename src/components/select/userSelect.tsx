import { Form, Modal, Select, Spin, Typography } from 'antd';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getUsers } from '@utils/api/users';
import { TUser, TUserSelectUiProps } from 'types/types';
import debounce from 'lodash/debounce';
import { useAppDispatch } from '@utils/store';

const { Option } = Select;

export const UserSelect: React.FC<TUserSelectUiProps> = ({
  control,
  addedUsers,
  errors,
}) => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useAppDispatch();

  // Получение пользователей (с пагинацией и фильтром)
  const fetchUsers = async (page: number, search = '') => {
    setLoading(true);
    try {
      const { data, total } = await getUsers(page);
      const filteredUsers = data.filter(
        (user) =>
          !addedUsers.includes(user.id) &&
          user.last_name?.toLowerCase().includes(search.toLowerCase()),
      );
      setUsers((prev) => [...prev, ...filteredUsers]);
      setHasMore(page * 8 < total); // Проверяем, есть ли еще данные
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    } finally {
      setLoading(false);
    }
  };

  // Дебаунс для поиска
  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
    setUsers([]); // Сбрасываем пользователей при новом поиске
    setPage(1); // Сброс страницы на первую при новом поиске
    fetchUsers(1, value); // Загружаем первую страницу
  }, 300);

  // Пагинация при прокрутке
  const handleScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const target = e.target as HTMLElement;
    // Проверяем, что скроллим в контейнере списка (dropdown)
    if (loading || !hasMore) return;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
      // 50px для буфера
      setPage((prev) => prev + 1); // Загружаем следующую страницу
    }
  };

  const handleAdd = () => {
    Modal.success({
      title: `Создать пользователя`,
      onOk: () => {},
    });
  };
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [form] = Form.useForm();

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   form.resetFields(); // Очистка формы при закрытии
  // };

  // const handleAddUser = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       console.log('Submitted values:', values);
  //       // Здесь можно добавить обработку, например, отправку данных на сервер
  //       handleCloseModal();
  //     })
  //     .catch((info) => {
  //       console.error('Validation failed:', info);
  //     });
  // };

  // Загрузим данные при изменении страницы
  useEffect(() => {
    fetchUsers(page, searchTerm);
  }, [page]); // Только изменяющаяся страница будет вызывать загрузку

  return (
    <>
      <Controller
        name="user"
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <Select
            {...field}
            showSearch
            placeholder="Выберите пользователя"
            notFoundContent={loading ? <Spin size="small" /> : 'Не найдено'}
            filterOption={false}
            onSearch={handleSearch}
            onPopupScroll={handleScroll} // Обновленный обработчик события скролла
            dropdownRender={(menu) => (
              <>
                {menu}
                {!users.find((user) => user.last_name !== searchTerm) && (
                  <div
                    style={{
                      padding: '8px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      color: '#1890ff',
                    }}
                    onClick={() => {
                      handleAdd();
                    }}
                  >
                    Добавить пользователя
                  </div>
                )}
              </>
            )}
          >
            {users.map((user, index) => (
              <Option
                key={`${user.id}-${index}`} // Уникальный ключ
                value={user.id}
                disabled={addedUsers.includes(user.id)}
              >
                {`${user.last_name} ${user.first_name[0]}.`}
              </Option>
            ))}
          </Select>
        )}
      />
      {/* <Modal
        title="Добавить пользователя"
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={handleAddUser}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical" name="add_user_form">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Введите email!' },
              { type: 'email', message: 'Введите корректный email!' },
            ]}
          >
            <Input placeholder="janet.weaver@reqres.in" />
          </Form.Item>
          <Form.Item
            label="Имя"
            name="first_name"
            rules={[{ required: true, message: 'Введите имя!' }]}
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item
            label="Фамилия"
            name="last_name"
            rules={[{ required: true, message: 'Введите фамилию!' }]}
          >
            <Input placeholder="Введите фамилию" />
          </Form.Item>
          <Form.Item label="Аватар" name="avatar">
            <Input placeholder="Введите URL аватара" />
          </Form.Item>
        </Form>
      </Modal> */}
    </>
  );
};
