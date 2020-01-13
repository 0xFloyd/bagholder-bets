//actions are where we actually make request to backend
import axios from "axios";
import {
  GET_STOCKS,
  ADD_STOCK,
  DELETE_STOCK,
  STOCKS_LOADING,
  SEARCH_STOCK,
  BUY_SUCCESS,
  BUY_FAIL
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

// the return is where we're implementing the action.type that's seen in the reducer.
// type is how you identify the action

// we call these actions from within the component
export const getStocks = user => dispatch => {
  dispatch(setStocksLoading());
  axios
    .post("/api/stocks/find", user)
    .then(res =>
      dispatch({
        type: GET_STOCKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

  return {
    type: GET_STOCKS
  };
};

// stock passed in from submit
// You can include getState as a second argument in dispatch to get the current state
export const addStock = stock => (dispatch, getState) => {
  axios
    .post("/api/stocks/add", stock, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_STOCK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

  return {
    type: ADD_STOCK,
    payload: stock
  };
};

export const buyStock = stock => (dispatch, getState) => {
  axios
    .post("/api/stocks/buy", stock, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: BUY_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

  return {
    type: BUY_SUCCESS,
    payload: stock
  };
};

export const searchStock = stock => (dispatch, getState) => {
  axios
    .post("/api/iex", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: SEARCH_STOCK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

  return {
    type: SEARCH_STOCK,
    payload: stock
  };
};

// return returns to reducer
export const deleteStock = stock => (dispatch, getState) => {
  axios
    .post(`/api/stocks/delete`, stock, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_STOCK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

  return {
    type: DELETE_STOCK,
    payload: stock
  };
};

export const setStocksLoading = () => {
  return {
    type: STOCKS_LOADING
  };
};
