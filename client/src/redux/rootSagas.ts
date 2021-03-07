import { all } from 'redux-saga/effects';
import loadServerDataSaga from './content/sagas/loadServerDataSaga';

export default function* rootSaga() {
  yield all([
    loadServerDataSaga(),
  ]);
}
