export enum actionTypes {
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  LOADING_PAGE = 'LOADING_PAGE',
  SERVER_DATA = 'SERVER_DATA',
  LOAD_SERVER_DATA = 'LOAD_SERVER_DATA',
  AUTH_USER = 'AUTH_USER'
};

export interface authData {
  name: string,
  password: string,
}

export interface authUserPayload {
  payload: {
    authData: authData;
    path: string;
  }
}
