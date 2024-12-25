import drawerReducer, { openDrawer, closeDrawer } from '../utils/slices/drawerSlice';

describe('drawerSlice', () => {
  const initialState = {
    open: false,
  };

  it('должен возвращать первоначальное состояние', () => {
    // const state = drawerReducer(undefined, { type: undefined });
    // expect(state).toEqual(initialState);
    expect(drawerReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен устанавливать open в true при вызове openDrawer', () => {
    const state = drawerReducer(initialState, openDrawer());
    expect(state.open).toBe(true);
  });

  it('должен устанавливать open в false при вызове closeDrawer', () => {
    const state = drawerReducer({ open: true }, closeDrawer());
    expect(state.open).toBe(false);
  });
});
