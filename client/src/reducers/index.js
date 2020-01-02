import { combineReducers } from 'redux';
import stockReducer from './stockReducer';

export default combineReducers({
    stock: stockReducer
})