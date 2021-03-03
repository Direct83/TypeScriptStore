import { actionTypes, contentReducerIS, contentActionTypes } from '../actionTypes';

const initialState: contentReducerIS = {
  serverData: '',
  loading: false,
};
export default function userReducer(state = initialState, action: contentActionTypes): contentReducerIS {
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
