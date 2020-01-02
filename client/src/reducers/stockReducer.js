import uuid from 'uuid';
import { GET_STOCKS, ADD_STOCK, DELETE_STOCK, STOCKS_LOADING } from '../actions/types';

const initialState = {
    stocks: [],
    loading: false
}

// returns data from store based on action (IE: action type)
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_STOCKS:
            return {
                ...state,
                stocks: action.payload,
                loading: false
            }

         case DELETE_STOCK:
            return {
                ...state,
                stocks: state.stocks.filter(stock => stock._id !== action.payload)
            }

        case ADD_STOCK:
            return {
                ...state,
                stocks: [...state.stocks, action.payload]
                // we use spread operator because we can't directly mutate state, we just add to it 
            }
        
        case STOCKS_LOADING:
            return {
                ...state,
                loading: true
                // we use spread operator because we can't directly mutate state, we just add to it 
            }

        default:
            return state;
    }
}