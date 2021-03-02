import actionTypes from '../actionTypes';

export function signInUser(userId, userName) {
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

export function authFetchSaga(authData, path) {
  return {
    type: actionTypes.AUTH_USER,
    payload: {
      authData,
      path,
    },
  };
}

export function checkAuth() {
  return async (dispatch) => {
    const response = await (await fetch('auth/check')).json();
    dispatch(signInUser(response.userId, response.userName));
  };
}
