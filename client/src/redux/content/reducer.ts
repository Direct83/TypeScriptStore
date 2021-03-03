import { actionTypes, ContentReducerIS, ContentActionTypes } from '../actionTypes';

const initialState: ContentReducerIS = {
  serverData: '',
  loading: false,
};
export default function userReducer(state = initialState, action: ContentActionTypes): ContentReducerIS {
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
