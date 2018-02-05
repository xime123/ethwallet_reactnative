import { all, fork } from 'redux-saga/effects';


import { watchRequestTxList } from './transaction';

export default function* rootSaga() {
  yield all([fork(watchRequestTxList)]);
}
