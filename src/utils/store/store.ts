import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

import usersReducer from '@utils/slices/usersSlice';
import drawerReducer from '@slices/drawerSlice';

export const rootReducer = combineSlices({
  users: usersReducer,
  drawer: drawerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = dispatchHook.withTypes<AppDispatch>();
export const useAppSelector = selectorHook.withTypes<RootState>();

export default store;
