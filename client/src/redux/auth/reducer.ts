import { actionTypes } from '../actionTypes';

const initialState: any = {
  userId: '',
  userName: '',
  isAuth: false,
};
export default function userReducer(state = initialState, action: any): any {
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