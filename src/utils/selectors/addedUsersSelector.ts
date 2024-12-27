import { createSelector } from 'reselect';
import { RootState } from '@utils/store';

const usersSelector = (state: RootState) => state.users.users;

export const addedUsersSelector = createSelector([usersSelector], (users) =>
  users.map((user) => user.id),
);
