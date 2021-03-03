import { actionTypes, AuthData } from '../actionTypes';

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

export function authFetchSaga(authData: AuthData, path: string) {
  return {
    type: actionTypes.AUTH_USER,
    payload: {
      authData,
      path,
    },
  };
}

export function checkAuth() {
  return async (dispatch: any) => {
    const response = await (await fetch('auth/check')).json();
    dispatch(signInUser(response.userId, response.userName));
  };
}
