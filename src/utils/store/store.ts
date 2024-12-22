import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

export const rootReducer = combineSlices({
  // Cлайсы
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = dispatchHook.withTypes<AppDispatch>();
export const useAppSelector = selectorHook.withTypes<RootState>();

export default store;
