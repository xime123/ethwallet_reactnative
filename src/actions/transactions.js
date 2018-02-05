import * as types from '../constants/ActionTypes';

export function requestTransactionList(
    isResfreshing,
    loading,
    address,
    isLoadMore,
    page=1
)  {
    return{
        type:types.REQUEST_TRANSACTION_LIST,
        isResfreshing,
        loading,
        isLoadMore,
        address,
        page
    }
}

export function fetchTransactionList(
    isResfreshing,
    loading,
    isLoadMore,
)  {
    return{
        type:types.FETCH_TRANSACTION_LIST,
        isResfreshing,
        loading,
        isLoadMore,
    }
}

export function receiveTransactionList(txList){
    return{
        type:types.RECEIVE_TRANSACTION_LIST,
        txList,
    }
}


