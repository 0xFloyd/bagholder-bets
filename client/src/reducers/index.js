import { combineReducers } from 'redux';
import stockReducer from './stockReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    stock: stockReducer,
    error: errorReducer,
    auth: authReducer
})