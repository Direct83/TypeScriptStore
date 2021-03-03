import { takeEvery, put, call } from 'redux-saga/effects';
import {actionTypes, AuthData, AuthUserPayload, ResponseAuth} from '../../actionTypes';
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
  const response:ResponseAuth = yield call(authUserFetch, authData, path);
  yield put(signInUser(response.userId, response.userName));
}

export default function* sagaWatcher() {
  yield takeEvery(actionTypes.AUTH_USER, sagaWorker);
}
