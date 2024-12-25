import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from 'types/types';

interface UsersState {
  users: TUser[];
  loading: boolean;
  page: number;
  hasMore: boolean;
}

const initialState: UsersState = {
  users: [
    {
      id: 1,
      avatar: 'https://i.pravatar.cc/50',
      first_name: 'Казимир',
      last_name: 'Антонина',
      full_name: 'Казимир Антонина',
      email: 'mail@mail.ru',
      gender: 'Женский',
      birthDate: '24-10-1998',
      role: 'Медсестра',
    },
    {
      id: 2,
      email: 'newuser@mail.ru',
      first_name: 'Варфоломей',
      last_name: 'Иванов',
      full_name: 'Варфоломей Иванов',
      avatar: 'https://i.pravatar.cc/20',
      gender: 'Мужской',
      birthDate: '15-12-1998',
      role: 'Доктор',
    },
    {
      id: 3,
      avatar: 'https://i.pravatar.cc/40',
      first_name: 'Иван',
      last_name: 'Петров',
      full_name: 'Иван Петров',
      email: 'newuser@mail.ru',
      gender: 'Мужской',
      birthDate: '01-01-2000',
      role: 'Доктор',
    },
  ],
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
    appendUsers: (state, action: PayloadAction<TUser[]>) => {
      state.users = [...state.users, ...action.payload];
    },
  },
});

export const { setLoading, setPage, setHasMore, setUsers, appendUsers } = usersSlice.actions;

export default usersSlice.reducer;
