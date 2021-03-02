import { takeEvery, put, call } from 'redux-saga/effects';
import actionTypes from '../../actionTypes';
import { signInUser } from '../actions';

export default function* sagaWatcher() {
  yield takeEvery(actionTypes.AUTH_USER, sagaWorker);
}

function* sagaWorker({ payload: { authData, path } }) {
  const response = yield call(() => authUserFetch(authData, path));
  yield put(signInUser(response.userId, response.userName));
}
// return async (dispatch) => {
//   const response = await (await fetch(`auth/${path}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ ...authData }),
//   })).json();
//   dispatch(signInUser(response.userId, response.userName));
// };

async function authUserFetch(authData, path) {
  return await (await fetch(`auth/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...authData }),
  })).json();
}
