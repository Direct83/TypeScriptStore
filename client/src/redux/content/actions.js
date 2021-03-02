import actionTypes from '../actionTypes';

export function loadingPage() {
  return {
    type: actionTypes.LOADING_PAGE,
  };
}

export function serverData(data) {
  return {
    type: actionTypes.SERVER_DATA,
    payload: data,
  };
}

export function loadServerDataSaga(data) {
  return {
    type: actionTypes.LOAD_SERVER_DATA,
    payload: data,
  };
}
