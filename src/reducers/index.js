import { combineReducers } from 'redux';
import transaction from './transaction';


const rootReducer = combineReducers({
    transaction,
});

export default rootReducer;