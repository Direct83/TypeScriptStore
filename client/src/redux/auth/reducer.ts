import {actionTypes, AuthActionTypes, AuthReducerIS} from '../actionTypes';

const initialState = {
  userId: '',
  userName: '',
  isAuth: false,
};
export default function userReducer(state = initialState, action: AuthActionTypes):AuthReducerIS {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
        isAuth: true,
      };
    case actionTypes.LOGOUT_USER:
      return {
        userId: '',
        userName: '',
        isAuth: false,
      };
    default:
      return state;
  }
}
