export enum actionTypes {
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  LOADING_PAGE = 'LOADING_PAGE',
  SERVER_DATA = 'SERVER_DATA',
  LOAD_SERVER_DATA = 'LOAD_SERVER_DATA',
  AUTH_USER = 'AUTH_USER'
}

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
export interface authReducerIS {
  userId: string,
  userName: string,
  isAuth: boolean,
}
interface signInUser {
  type: typeof actionTypes.LOGIN_USER,
  payload: {
    userId: string,
    userName: string,
  },
}
interface logOutUser {
  type: typeof actionTypes.LOGOUT_USER,
}
export type authActionTypes = signInUser | logOutUser


export interface contentReducerIS {
  serverData: string,
  loading: boolean,
}

interface loadingPage {
  type: typeof actionTypes.LOADING_PAGE
}
interface serverData {
  type: typeof actionTypes.SERVER_DATA,
  payload: string,
}
export type contentActionTypes = loadingPage | serverData
