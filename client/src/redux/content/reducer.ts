<<<<<<< HEAD
import { actionTypes, contentReducerIS, contentActionTypes } from '../actionTypes';

const initialState: contentReducerIS = {
  serverData: '',
  loading: false,
};
export default function userReducer(state = initialState, action: contentActionTypes): contentReducerIS {
=======
import { actionTypes, ContentReducerIS, ContentActionTypes } from '../actionTypes';

const initialState: ContentReducerIS = {
  serverData: '',
  loading: false,
};
export default function userReducer(state = initialState, action: ContentActionTypes): ContentReducerIS {
>>>>>>> 5d31e26f3c12a46c2341e09dde9a99a64ee87b2d
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
