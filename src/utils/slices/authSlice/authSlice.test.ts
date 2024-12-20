import authReducer, { login, logout } from './authSlice';
import { expect, describe } from '@jest/globals';
import { TUser } from 'types/user';

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle login action', () => {
    const user: TUser = { name: 'Sebastian', email: 'sebastian@mail.ru' };
    const action = login(user);

    const state = authReducer(initialState, action);

    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
  });

  it('should handle logout action', () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { name: 'Sebastian', email: 'sebastian@mail.ru' },
    };
    const action = logout();

    const state = authReducer(loggedInState, action);

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});
