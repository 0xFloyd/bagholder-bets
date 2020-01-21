import { START_LOADING, END_LOADING } from "../actions/types";

// initial error state. Remeber, all these things are sent from api as response
const initialState = {
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case END_LOADING:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
