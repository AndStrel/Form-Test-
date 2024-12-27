import { TDrawerState } from 'types/types';
import drawerReducer, { openDrawer, closeDrawer } from '../utils/slices/drawerSlice';

describe('drawerSlice', () => {
  const initialState: TDrawerState = {
    isRedacting: false,
    open: false,
    user: undefined,
  };

  it('должен возвращать первоначальное состояние', () => {
    expect(drawerReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен устанавливать open в true при вызове openDrawer', () => {
    const state = drawerReducer(initialState, openDrawer());
    expect(state.open).toBe(true);
  });

  it('должен устанавливать open в false при вызове closeDrawer', () => {
    const state = drawerReducer(initialState, closeDrawer());
    expect(state.open).toBe(false);
  });
});
