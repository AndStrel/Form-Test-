import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    addUserServer: (state, action: PayloadAction<TUser[]>) => {
      const filteredUsers = action.payload.filter(
        (user) => !state.usersServer.some((existingUser) => existingUser.id === user.id),
      );
      state.usersServer.push(...filteredUsers);
    },

    addUser: (state, action: PayloadAction<TUser>) => {
      const existingUser = state.users.find((user) => user.id === action.payload.id);
      if (!existingUser) {
        state.users.push(action.payload);
      }
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

export const { setLoading, setPage, setHasMore, setUsers, addUserServer, addUser, updateUser } =
  usersSlice.actions;

export default usersSlice.reducer;
