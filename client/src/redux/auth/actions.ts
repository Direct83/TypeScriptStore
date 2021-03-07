import { actionTypes } from '../actionTypes';

export function signInUser(userId: string, userName: string) {
  return {
    type: actionTypes.LOGIN_USER,
    payload: {
      userId,
      userName,
    },
  };
}
export function logOutUser() {
  return {
    type: actionTypes.LOGOUT_USER,
  };
}
