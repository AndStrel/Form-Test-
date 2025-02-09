import { Modal, Select, Spin } from 'antd';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getUsers } from '@utils/api/users';
import { TUser, TUserSelectUiProps } from 'types/types';
import debounce from 'lodash/debounce';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';
import { AddUserForm } from '@components/addUserForm/addUserForm';
import { setUser } from '@utils/slices/drawerSlice';
import { addUserServer } from '@utils/slices/usersSlice';
import { addedUsersSelector } from '@utils/selectors/addedUsersSelector';

const { Option } = Select;

export const UserSelect: React.FC<TUserSelectUiProps> = ({
  control,
  errors,
}) => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchName, setSearchName] = useState('');

  const dispatch = useAppDispatch();
  const addedUsers = useAppSelector(addedUsersSelector);
  const isRedacting = useAppSelector(
    (state: RootState) => state.drawer.isRedacting,
  );

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
      setUsers((prev) => {
        const uniqueUsers = [...prev, ...filteredUsers].filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i, // Убираем дубли
        );
        return page === 1 ? filteredUsers : uniqueUsers;
      });
      dispatch(addUserServer(data));
      setHasMore(page * 8 < total); // Проверяем, есть ли еще данные
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    } finally {
      setLoading(false);
    }
  };

  // Дебаунс для поиска
  const handleSearch = debounce((value: string) => {
    setSearchName(value);
    setUsers([]); // Сбрасываем пользователей при новом поиске
    setPage(1); // Сброс страницы на первую при новом поиске
    fetchUsers(1, value); // Загружаем первую страницу
  }, 300);

  // Пагинация при прокрутке
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (loading || !hasMore) return;

    // Проверяем, достиг ли пользователь конца списка
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
      setPage((prev) => prev + 1);
      fetchUsers(page + 1, searchName);
    }
  };

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (page > 1) {
      fetchUsers(page, searchName);
    }
  }, [page]);

  useEffect(() => {
    setUsers([]); // Обнуляем пользователей при обновлении addedUsers
    fetchUsers(1, searchName);
  }, [addedUsers]);

  return (
    <>
      <Controller
        name="user"
        control={control}
        disabled={isRedacting}
        defaultValue={undefined}
        render={({ field }) => (
          <Controller
            name="user"
            control={control}
            disabled={isRedacting}
            defaultValue={undefined}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                placeholder="Выберите пользователя"
                notFoundContent={loading ? <Spin size="small" /> : 'Не найдено'}
                filterOption={false}
                dropdownRender={(menu) => (
                  <div
                    onScroll={handleScroll} // Скролл внутри выпадающего списка
                    style={{
                      maxHeight: '150px', // Ограничиваем высоту
                      overflowY: 'auto', // Добавляем скролл только здесь
                    }}
                  >
                    {menu}
                    {!users.find((user) => user.last_name !== searchName) && (
                      <div
                        style={{
                          padding: '8px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          color: '#1890ff',
                        }}
                        onClick={showModal}
                      >
                        Добавить пользователя
                      </div>
                    )}
                  </div>
                )}
                onSearch={handleSearch}
                onChange={(value) => {
                  const selectedUser = users.find(
                    (user) => user.id === Number(value),
                  );
                  if (selectedUser) {
                    dispatch(setUser(selectedUser));
                  }
                  field.onChange(value);
                }}
              >
                {users.map((user) => (
                  <Option
                    key={user.id} // Уникальный ключ
                    value={user.id}
                    disabled={addedUsers.includes(user.id)}
                  >
                    {`${user.first_name} ${user.last_name}`}
                  </Option>
                ))}
              </Select>
            )}
          />
        )}
      />
      <Modal
        title="Добавить пользователя"
        open={open}
        footer={null}
        onCancel={handleCancel}
      >
        <AddUserForm isModal={setOpen} />
      </Modal>
    </>
  );
};
