import { REFRESH_USER_DATA } from "../actions/types";

const initialState = {
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REFRESH_USER_DATA:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}
