//actions are where we actually make request to backend
import axios from "axios";
import { REFRESH_USER_DATA } from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";
import store from "../store";

export const refreshUserData = user => dispatch => {
  // User loading. dispatch this action, Pass this in before anything to change the state of application to loading
  axios
    .post("/api/user/data", user)
    .then(res =>
      dispatch({
        type: REFRESH_USER_DATA,
        payload: res.data //
      })
    )
    //call error action to get errors if there are some. returnErrors takes in parameters, then returns object with errors
    .catch(err => {
      dispatch(returnErrors(err));
    });

  return {
    type: REFRESH_USER_DATA,
    payload: user
  };
};
