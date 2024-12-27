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
  const addedUsers = useAppSelector((state: RootState) =>
    state.users.users.map((user) => user.id),
  );
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
      setUsers((prev) => [...prev, ...filteredUsers]);
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
  const handleScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const target = e.target as HTMLElement;

    if (loading || !hasMore) return;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
      // 50px для буфера
      setPage((prev) => prev + 1); // Загружаем следующую страницу
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
    fetchUsers(page);
  }, [page]);

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
                onSearch={handleSearch}
                onPopupScroll={handleScroll}
                onChange={(value) => {
                  const selectedUser = users.find(
                    (user) => user.id === Number(value),
                  );
                  if (selectedUser) {
                    dispatch(setUser(selectedUser));
                  }
                  field.onChange(value);
                }}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    {!users.find((user) => user.last_name !== searchName) && (
                      <div
                        style={{
                          padding: '8px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          color: '#1890ff',
                        }}
                        onClick={() => {
                          showModal();
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
