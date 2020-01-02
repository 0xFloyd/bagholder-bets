//actions are where we actually make request to backend 
import axios from 'axios'
import { GET_STOCKS, ADD_STOCK, DELETE_STOCK, STOCKS_LOADING } from './types';

// the return is where we're implementing the action.type that's seen in the reducer. 
// type is how you identify the action 

// we call these actions from within the component 
export const getStocks = () => dispatch => {
    dispatch(setStocksLoading());
    axios
        .get('/api/stocks')
        .then(res => dispatch({
            type: GET_STOCKS,
            payload: res.data
        }))
    
    return {
        type: GET_STOCKS
    }
}


// stock passed in from submit
export const addStock = (stock) => (dispatch) => {
    axios.post('/api/stocks', stock)
    .then(res => dispatch({
        type: ADD_STOCK,
        payload: res.data
    }))
    
    return {
        type: ADD_STOCK,
        payload: stock
    }
}


// return returns to reducer 
export const deleteStock = (id) => dispatch => {
    axios.delete(`/api/stocks/${id}`)
    .then(res => dispatch({
        type: DELETE_STOCK,
        payload: id
    }))
    return {
        type: DELETE_STOCK,
        payload: id
    }
}

export const setStocksLoading = () => {
    return {
        type: STOCKS_LOADING
    }
}