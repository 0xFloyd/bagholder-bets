import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Main from "./components/Main";
import StockTable from "./components/StockTable";
import StockModal from "./components/StockModal";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { loadUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  //load User from redux when app loads
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Main></Main>
        </div>
      </Provider>
    );
  }
}

export default App;
