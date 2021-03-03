import { actionTypes } from '../actionTypes';

const initialState: any = {
  serverData: '',
  loading: false,
};
export default function userReducer(state = initialState, action: any): any {
  switch (action.type) {
    case actionTypes.SERVER_DATA:
      return {
        ...state,
        serverData: action.payload,
        loading: false,
      };
    case actionTypes.LOADING_PAGE:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
