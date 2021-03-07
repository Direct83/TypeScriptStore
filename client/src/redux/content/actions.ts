import { actionTypes } from '../actionTypes';

export function loadingPage() {
  return {
    type: actionTypes.LOADING_PAGE,
  };
}

export function serverData(data: string) {
  return {
    type: actionTypes.SERVER_DATA,
    payload: data,
  };
}

export function loadServerDataSaga() {
  return {
    type: actionTypes.LOAD_SERVER_DATA,
  };
}
