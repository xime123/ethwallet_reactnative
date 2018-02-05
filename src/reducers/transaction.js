import * as types from '../constants/ActionTypes';
const initialState={
    isRefreshing: false,
    loading: false,
    isLoadMore: false,
    noMore: false,
    txList: {} 
}

export default function transaction(state=initialState,action)
{
    switch(action.type){
        case types.FETCH_TRANSACTION_LIST:
            return Object.assign({},state,{
                isRefreshing:action.isRefreshing,
                loading:action.loading,
                isLoadMore:action.isLoadMore
            });
        break;
        case types.RECEIVE_TRANSACTION_LIST:
            return Object.assign({},state,{
                isRefreshing:false,
                isLoadMore:false,
                loading:state.false,
                noMore:action.txList.length===0,
                txList:state.isLoadMore?loadMore(state,action):
                combine(state,action),
                
             });
        break;
        default:
        return state;
    }
}

function combine(state,action){
    state.txList=action.txList;
    return state.txList;
}

function loadMore(state,action){
    return state.txList.concat(action.txList);
}

/**
 * filter duplicate data when loading more.
*/
function concatFilterDuplicate(list1, list2) {
    const set = new Set(list1.map(item => item.id));
    const filterList2 = [];
    const length = list2.length;
    for (let i = 0; i < length; i++) {
      if (!set.has(list2[i].id)) {
        filterList2.push(list2[i]);
      }
    }
    return list1.concat(filterList2);
  }
  