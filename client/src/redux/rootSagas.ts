import { all } from 'redux-saga/effects';
import loadServerDataSaga from './content/sagas/loadServerDataSaga';
import authUserSaga from './auth/sagas/authUserSaga';

export default function* rootSaga() {
  yield all([
    loadServerDataSaga(),
    authUserSaga(),
  ]);
}
