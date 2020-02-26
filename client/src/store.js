import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//create initial store of application
const initialState = {};

//add any middleware we need here, and then spread operator below applies them all
const middleware = [thunk];

//rootReducer --> seperate file, combines all reducers.
//compose --> used to combine all middleware
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
  )
);

export default store;
