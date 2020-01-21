import { START_LOADING, END_LOADING } from "./types";

// return errors
export const startLoading = () => {
  return {
    type: START_LOADING
  };
};

// clear errors
export const endLoading = () => {
  return {
    type: END_LOADING
  };
};
