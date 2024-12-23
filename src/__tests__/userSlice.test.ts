import usersReducer, {
  setLoading,
  setPage,
  setHasMore,
  setUsers,
  appendUsers,
} from '../utils/slices/usersSlice';
import { TUser } from 'types/types';

describe('usersSlice', () => {
  const initialState = {
    users: [],
    loading: false,
    page: 1,
    hasMore: true,
  };

  const testUser: TUser = {
    id: 1,
    email: 'test@example.com',
    first_name: 'Иван',
    last_name: 'Иванов',
    avatar: 'avatar_url',
  };

  it('Проверяем, что редьюсер возвращает начальное состояние при передаче undefined', () => {
    expect(usersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Проверяем, что экшен setLoading обновляет флаг загрузки', () => {
    expect(usersReducer(initialState, setLoading(true))).toEqual({
      users: [],
      loading: true,
      page: 1,
      hasMore: true,
    });
  });

  it('Проверяем, что экшен setPage обновляет номер страницы', () => {
    expect(usersReducer(initialState, setPage(2))).toEqual({
      users: [],
      loading: false,
      page: 2,
      hasMore: true,
    });
  });

  it('Проверяем, что экшен setHasMore обновляет флаг hasMore', () => {
    expect(usersReducer(initialState, setHasMore(false))).toEqual({
      users: [],
      loading: false,
      page: 1,
      hasMore: false,
    });
  });

  it('Проверяем, что экшен setUsers обновляет список пользователей', () => {
    const usersList: TUser[] = [testUser];
    expect(usersReducer(initialState, setUsers(usersList))).toEqual({
      users: usersList,
      loading: false,
      page: 1,
      hasMore: true,
    });
  });

  it('Проверяем, что экшен appendUsers добавляет пользователей к текущим', () => {
    const usersList: TUser[] = [testUser];
    const updatedState = usersReducer(initialState, setUsers(usersList));
    const newUsers: TUser[] = [
      {
        id: 2,
        email: 'newuser@example.com',
        first_name: 'Петр',
        last_name: 'Петров',
        avatar: 'new_avatar_url',
      },
    ];
    expect(usersReducer(updatedState, appendUsers(newUsers))).toEqual({
      users: [...usersList, ...newUsers],
      loading: false,
      page: 1,
      hasMore: true,
    });
  });
});
