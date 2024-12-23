import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from 'types/types';

interface UsersState {
  users: TUser[];
  loading: boolean;
  page: number;
  hasMore: boolean;
}

const initialState: UsersState = {
  users: [],
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
