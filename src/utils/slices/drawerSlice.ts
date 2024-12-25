import { createSlice } from '@reduxjs/toolkit';
import { TDrawerState } from 'types/types';

const initialState: TDrawerState = {
  open: false,
  isRedacting: false,
  user: undefined,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.open = true;
    },
    setIsRedacting: (state, isRedacting) => {
      state.isRedacting = isRedacting.payload;
    },
    setUser: (state, user) => {
      state.user = user.payload;
    },
    closeDrawer: (state) => {
      state.open = false;
      state.isRedacting = false;
      state.user = undefined;
    },
  },
});

export const { openDrawer, setUser, setIsRedacting, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
