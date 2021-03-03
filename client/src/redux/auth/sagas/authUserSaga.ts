import { takeEvery, put, call } from 'redux-saga/effects';
import { actionTypes, AuthUserPayload, AuthData, ResponseAuth } from '../../actionTypes';
import { signInUser } from '../actions';

async function authUserFetch(authData: AuthData, path: string): Promise<ResponseAuth> {
  return await (await fetch(`auth/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...authData }),
  })).json();
}
function* sagaWorker({ payload: { authData, path } }: AuthUserPayload) {
  const { userId, userName }: ResponseAuth = yield call(authUserFetch, authData, path);
  yield put(signInUser(userId, userName));
}
export default function* sagaWatcher() {
  yield takeEvery(actionTypes.AUTH_USER, sagaWorker);
}
