import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./components/Main";
import { loadUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    console.log("APP___MAIN component rendered");
    return (
      <Provider store={store}>
        <div id="App" className="App">
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
