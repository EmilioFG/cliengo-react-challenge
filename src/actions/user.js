import { types } from '../types';
const { GET_USERS } = types;

export const createUser = (user) => {
  try {
    let lastIndex = 1;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const cloneUsers = [...users];

    if (cloneUsers.length) {
      lastIndex = (cloneUsers[cloneUsers.length - 1]['id']) + 1;
    }

    Object.assign(user, { 'id': lastIndex });
    cloneUsers.push(user);

    localStorage.setItem('users', JSON.stringify(cloneUsers));
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = (user, id) => {
  try {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let cloneUsers = [...users];

    const indexUser = cloneUsers.findIndex((user) => user.id === +id);

    Object.assign(user, { 'id': cloneUsers[indexUser]['id'] });

    cloneUsers[indexUser] = user;

    localStorage.setItem('users', JSON.stringify(cloneUsers));

  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = (id) => {
  try {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let cloneUsers = [...users];

    const indexUser = cloneUsers.findIndex((user) => user.id === +id);

    cloneUsers.splice(indexUser, 1);

    localStorage.setItem('users', JSON.stringify(cloneUsers));
  } catch (error) {
    console.log(error);
  }
}

export const getAllUsers = () => {
  return (dispatch) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    dispatch(setUsers(users))
  }
}

export const setUsers = (users) => ({
  type: GET_USERS,
  payload: users,
});
