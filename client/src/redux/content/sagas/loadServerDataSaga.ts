import { takeEvery, put, retry } from 'redux-saga/effects';
import { actionTypes } from '../../actionTypes';
import { loadingPage, serverData } from '../actions';

async function fetchServerData() {
  return await (await fetch('content/text')).json();
}
function* sagaWorker() {
  yield put(loadingPage());
  const response = yield retry(3, 1000, fetchServerData);
  yield put(serverData(response.text));
}
export default function* sagaWatcher() {
  yield takeEvery(actionTypes.LOAD_SERVER_DATA as any, sagaWorker);
}
