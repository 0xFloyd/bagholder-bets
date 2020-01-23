import axios from "axios";
import { returnErrors } from "./errorActions";
import { refreshUserData } from "./userActions";
import store from "../store";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";

// Check token and load user
// You can include getState as a second argument in dispatch to get the current state
export const loadUser = () => (dispatch, getState) => {
  // User loading. dispatch this action, Pass this in before anything to change the state of application to loading

  dispatch({ type: USER_LOADING });

  axios
    .post("/api/authorize/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data //res.data should be the whole response. the token, and the user object
      })
    )
    .then(() => {
      const state = store.getState();
      console.log(
        "state called in .then in loadUser: " + JSON.stringify(state)
      );
      dispatch(refreshUserData(state.auth.user));
    })

    //call error action to get errors if there are some. returnErrors takes in parameters, then returns object with errors
    .catch(err => {
      dispatch(returnErrors(err));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register user
export const register = ({ name, email, password }) => dispatch => {
  dispatch({ type: USER_LOADING });
  // configure headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // Request body data
  const body = JSON.stringify({ name, email, password });

  // send POST request to user api endpoint
  axios
    .post("/api/user", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login user
export const login = ({ email, password }) => dispatch => {
  dispatch({ type: USER_LOADING });
  // configure headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // Request body data
  const body = JSON.stringify({ email, password });

  // send POST request to user api endpoint
  axios
    .post("/api/authorize", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const tokenConfig = getState => {
  //get token from localStorage. this is in our state
  const token = getState().auth.token;

  // Now add token to headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["auth-token"] = token;
  }

  return config;
};
