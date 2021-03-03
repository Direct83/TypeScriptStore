import { takeEvery, put, retry } from 'redux-saga/effects';
import {actionTypes, ResponseServerDataSaga} from '../../actionTypes';
import { loadingPage, serverData } from '../actions';

async function fetchServerData(): Promise<ResponseServerDataSaga> {
  return await (await fetch('content/text')).json();
}

function* sagaWorker() {
  yield put(loadingPage());
  const response:ResponseServerDataSaga = yield retry(3, 1000, fetchServerData);
  yield put(serverData(response.text));
}

export default function* sagaWatcher() {
  yield takeEvery(actionTypes.LOAD_SERVER_DATA, sagaWorker);
}

