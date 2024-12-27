import usersReducer, {
  setLoading,
  setPage,
  setHasMore,
  setUsers,
  addUserServer,
  addUser,
  updateUser,
  deleteUserInState,
} from '../utils/slices/usersSlice';
import { TUser } from 'types/types';
import { startUsers } from '../utils/constants';

// Мокаем API, чтобы возвращать предопределенные данные
jest.mock('../utils/api/users', () => ({
  getUsers: jest.fn(() => Promise.resolve({ data: startUsers, total: startUsers.length })),
  getUserById: jest.fn(() => Promise.resolve(startUsers[0])),
  createUser: jest.fn(() => Promise.resolve(startUsers[0])),
  localupdateUser: jest.fn(() => Promise.resolve(startUsers[0])),
  deleteUser: jest.fn(() => Promise.resolve(startUsers[0])),
}));

const mockUser: TUser = startUsers[0];
const mockUsers: TUser[] = startUsers;

// Настройка мока localStorage и подавление ошибок в консоли
beforeAll(() => {
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('usersSlice', () => {
  const initialState = {
    users: [],
    usersServer: [],
    loading: false,
    page: 1,
    hasMore: true,
  };

  it('должен возвращать начальное состояние', () => {
    expect(usersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен устанавливать состояние загрузки', () => {
    const action = setLoading(true);
    const state = usersReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('должен устанавливать номер страницы', () => {
    const action = setPage(2);
    const state = usersReducer(initialState, action);
    expect(state.page).toBe(2);
  });

  it('должен устанавливать флаг "hasMore"', () => {
    const action = setHasMore(false);
    const state = usersReducer(initialState, action);
    expect(state.hasMore).toBe(false);
  });

  it('должен добавлять пользователей на сервер и фильтровать дубликаты', () => {
    const initial = {
      ...initialState,
    };
    const newUsers: TUser[] = mockUsers;
    const action = addUserServer(newUsers);

    const state = usersReducer(initial, action);
    expect(state.usersServer).toHaveLength(3);
    expect(state.usersServer).toEqual(newUsers);
  });

  it('должен добавлять пользователя, если его еще нет в списке', () => {
    const action = addUser(mockUser);
    const state = usersReducer(initialState, action);
    expect(state.users).toEqual([mockUser]);
  });

  it('должен обновлять пользователя, если он уже существует', () => {
    const state = { ...initialState, users: mockUsers };
    const updatedUser: TUser = { ...mockUsers[1], last_name: 'Казимир' };
    const action = updateUser(updatedUser);
    const newState = usersReducer(state, action);
    expect(newState.users[1].last_name).toBe('Казимир');
  });

  it('должен добавлять пользователя, если его нет в списке во время обновления', () => {
    const updatedUser: TUser = mockUsers[1];
    const action = updateUser(updatedUser);

    const state = usersReducer(initialState, action);
    expect(state.users).toEqual([updatedUser]);
  });

  it('должен удалять пользователя из состояния', () => {
    const state = { ...initialState, users: mockUsers };
    const action = deleteUserInState(1245);

    const newState = usersReducer(state, action);
    expect(newState.users).toEqual(mockUsers.filter((user) => user.id !== 1245));
  });
});
