import { types } from '../types';

const { GET_USERS } = types;

export const userReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return [...payload];
    default:
      return state;
  }
}
