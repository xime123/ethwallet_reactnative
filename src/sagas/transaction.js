/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { put, take, call, fork } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import ToastUtil from '../util/ToastUtil';
import RequestUtil from '../util/RequestUtil';
import { ETH_TRANSATCION_LIST } from '../constants/Urls';
import { fetchTransactionList, receiveTransactionList } from '../actions/transactions';

export function* requestTxList(
  isRefreshing,
  loading,
  address,
  isLoadMore,
  page
) {
  try {
    yield put(fetchTransactionList(isRefreshing, loading, isLoadMore));
    let url=`${ETH_TRANSATCION_LIST}&address=${address}&page=${page}`;
    console.log('url='+url);
    const txListResult = yield call(
      RequestUtil.request,
      `${ETH_TRANSATCION_LIST}&address=${address}&page=${page}`,
      'get'
    );
    yield put(receiveTransactionList(
      txListResult.result
    ));
    const errorMessage = txListResult.message;
    if (errorMessage && errorMessage !== '') {
        console.log("errorMessage="+errorMessage);
      //yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveTransactionList([]));
    ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestTxList() {
  while (true) {
    const {
      isRefreshing, loading, address, isLoadMore, page
    } = yield take(types.REQUEST_TRANSACTION_LIST);
    yield fork(
        requestTxList,
      isRefreshing,
      loading,
      address,
      isLoadMore,
      page
    );
  }
}
