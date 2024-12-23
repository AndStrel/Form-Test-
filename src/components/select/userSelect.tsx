import { Form, Select, Spin, Typography } from 'antd';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getUsers } from '@utils/api/users';
import { TUser, TUserSelectUiProps } from 'types/types';
import debounce from 'lodash/debounce';
import { openDrawer } from '@utils/slices/drawerSlice';
import { useAppDispatch } from '@utils/store';

const { Option } = Select;

export const UserSelect: React.FC<TUserSelectUiProps> = ({
  control,
  addedUsers,
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
          user.last_name.toLowerCase().includes(search.toLowerCase()),
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

  // Загрузим данные при изменении страницы
  useEffect(() => {
    fetchUsers(page, searchTerm);
  }, [page]); // Только изменяющаяся страница будет вызывать загрузку

  return (
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
              {!users.find((user) => user.last_name === searchTerm) && (
                <div
                  style={{
                    padding: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    color: '#1890ff',
                  }}
                  onClick={() => dispatch(openDrawer())}
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
  );
};
