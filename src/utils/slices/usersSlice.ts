import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { update } from 'lodash';
import { TUser } from 'types/types';

interface UsersState {
  users: TUser[];
  usersServer: Partial<TUser>[];
  loading: boolean;
  page: number;
  hasMore: boolean;
}

const initialState: UsersState = {
  users: [],
  usersServer: [],
  loading: false,
  page: 1,
  hasMore: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setUsers: (state, action: PayloadAction<TUser[]>) => {
      state.users = action.payload;
    },
    // appendUsers: (state, action: PayloadAction<Partial<TUser>>) => {
    //   // Проверяем, существует ли пользователь с таким id
    //   const userExists = state.usersServer.some((user) => user.id === action.payload.id);

    //   if (!userExists) {
    //     // Добавляем нового пользователя, если его еще нет в списке
    //     state.usersServer.push(action.payload as TUser);
    //   }
    // },
    addUserServer: (state, action: PayloadAction<TUser[]>) => {
      // Фильтруем новых пользователей, исключая тех, чьи id уже есть в state
      const filteredUsers = action.payload.filter(
        (user) => !state.usersServer.some((existingUser) => existingUser.id === user.id),
      );

      // Добавляем только новых пользователей в state
      state.usersServer.push(...filteredUsers);
    },

    addUser: (state, action: PayloadAction<TUser>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<TUser>) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      } else {
        state.users.push(action.payload);
      }
    },
  },
});

export const {
  setLoading,
  setPage,
  setHasMore,
  setUsers,
  addUserServer,
  // appendUsers,
  addUser,
  updateUser,
} = usersSlice.actions;

export default usersSlice.reducer;
