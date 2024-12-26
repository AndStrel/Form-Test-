import usersReducer, {
  setLoading,
  setPage,
  setHasMore,
  setUsers,
  // appendUsers,
  addUserServer,
  addUser,
  updateUser,
} from '../utils/slices/usersSlice';
import { TUser } from 'types/types';

describe('usersSlice', () => {
  const initialState = {
    users: [],
    usersServer: [],
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
    birthDate: '24-10-1998',
  };

  const anotherUser: TUser = {
    id: 2,
    email: 'another@example.com',
    first_name: 'Петр',
    last_name: 'Петров',
    avatar: 'another_avatar_url',
    birthDate: '10-10-1995',
  };

  it('Проверяем, что редьюсер возвращает начальное состояние при передаче undefined', () => {
    expect(usersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Проверяем, что экшен setLoading обновляет флаг загрузки', () => {
    expect(usersReducer(initialState, setLoading(true))).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('Проверяем, что экшен setPage обновляет номер страницы', () => {
    expect(usersReducer(initialState, setPage(2))).toEqual({
      ...initialState,
      page: 2,
    });
  });

  it('Проверяем, что экшен setHasMore обновляет флаг hasMore', () => {
    expect(usersReducer(initialState, setHasMore(false))).toEqual({
      ...initialState,
      hasMore: false,
    });
  });

  it('Проверяем, что экшен setUsers обновляет список пользователей', () => {
    const usersList: TUser[] = [testUser, anotherUser];
    expect(usersReducer(initialState, setUsers(usersList))).toEqual({
      ...initialState,
      users: usersList,
    });
  });

  // it('Проверяем, что экшен appendUsers добавляет новых пользователей', () => {
  //   const initialUsers = [testUser];
  //   const stateWithUsers = { ...initialState, users: initialUsers };
  //   const newUsers = [anotherUser, testUser]; // testUser уже есть в state

  //   expect(usersReducer(stateWithUsers, appendUsers(anotherUser))).toEqual({
  //     ...stateWithUsers,
  //     users: [testUser, anotherUser], // Добавится только anotherUser
  //   });
  // });

  it('Проверяем, что экшен addUserServer добавляет нового пользователя, если его нет в списке', () => {
    const initialUsersServer = [testUser];
    const stateWithServerUsers = { ...initialState, usersServer: initialUsersServer };

    const newUser = anotherUser;

    expect(usersReducer(stateWithServerUsers, addUserServer([newUser]))).toEqual({
      ...stateWithServerUsers,
      usersServer: [testUser, anotherUser], // Добавлен новый пользователь
    });
  });

  it('Проверяем, что экшен addUser добавляет нового пользователя', () => {
    const initialUsers = [testUser];
    const stateWithUsers = { ...initialState, users: initialUsers };

    expect(usersReducer(stateWithUsers, addUser(anotherUser))).toEqual({
      ...stateWithUsers,
      users: [testUser, anotherUser],
    });
  });

  it('Проверяем, что экшен updateUser обновляет существующего пользователя', () => {
    const updatedUser = { ...testUser, first_name: 'Обновленный Иван' };
    const initialUsers = [testUser];
    const stateWithUsers = { ...initialState, users: initialUsers };

    expect(usersReducer(stateWithUsers, updateUser(updatedUser))).toEqual({
      ...stateWithUsers,
      users: [updatedUser],
    });
  });

  it('Проверяем, что экшен updateUser добавляет пользователя, если его нет в списке', () => {
    const initialUsers = [testUser];
    const stateWithUsers = { ...initialState, users: initialUsers };

    expect(usersReducer(stateWithUsers, updateUser(anotherUser))).toEqual({
      ...stateWithUsers,
      users: [testUser, anotherUser],
    });
  });
});
