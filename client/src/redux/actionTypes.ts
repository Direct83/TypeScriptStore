export enum actionTypes {
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  LOADING_PAGE = 'LOADING_PAGE',
  SERVER_DATA = 'SERVER_DATA',
  LOAD_SERVER_DATA = 'LOAD_SERVER_DATA',
  AUTH_USER = 'AUTH_USER',
};

export interface AuthData {
  name: string,
  password: string,
}

export interface AuthUserPayload {
  type: actionTypes.AUTH_USER
  payload: {
    authData: AuthData;
    path: string;
  }
}
export interface ResponseAuth {
  userId: string,
  userName: string,
}
export interface ResponseServerDataSaga {
  text: string,
}


export interface AuthReducerIS{
  userId: string,
  userName: string,
  isAuth: boolean,
}
export interface ContentReducerIS{
  serverData: string,
  loading: boolean,
}

interface SignInUser{
  type: typeof actionTypes.LOGIN_USER,
  payload: {
    userId:string,
    userName:string,
  }
}
interface LogOutUser{
  type: typeof actionTypes.LOGOUT_USER,
}
export type AuthActionTypes = SignInUser | LogOutUser

export interface LoadingPage{
  type: typeof actionTypes.LOADING_PAGE,
}
export interface ServerData{
  type: typeof actionTypes.SERVER_DATA,
  payload: string
}
export type ContentActionTypes = LoadingPage | ServerData

