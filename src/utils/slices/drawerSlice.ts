import { createSlice } from '@reduxjs/toolkit';
import { TDrawerState } from 'types/types';

const initialState: TDrawerState = {
  open: false,
  title: '',
  user: undefined,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state, title) => {
      state.open = true;
      state.title = title.payload;
    },
    setUser: (state, user) => {
      state.user = user.payload;
    },
    closeDrawer: (state) => {
      state.open = false;
      state.title = '';
      state.user = undefined;
    },
  },
});

export const { openDrawer, setUser, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
