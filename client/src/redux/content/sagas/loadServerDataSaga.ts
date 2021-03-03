import { takeEvery, put, call } from 'redux-saga/effects';
import { actionTypes, ResponseServerDataSaga } from '../../actionTypes';
import { loadingPage, serverData } from '../actions';

async function fetchServerData(): Promise<ResponseServerDataSaga> {
  return await (await fetch('content/text')).json();
}
function* sagaWorker() {
  yield put(loadingPage());
  const { text }: ResponseServerDataSaga = yield call(fetchServerData);
  yield put(serverData(text));
}
export default function* sagaWatcher() {
  yield takeEvery(actionTypes.LOAD_SERVER_DATA, sagaWorker);
}
