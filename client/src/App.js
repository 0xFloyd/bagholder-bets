import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import AppNavBar from "./components/AppNavbar";
import StockTable from "./components/StockTable";
//import StockWatchList from "./components/StockWatchList";
import StockModal from "./components/StockModal";
import Register from "./components/Login";

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
          <AppNavBar></AppNavBar>
          <br></br>
          <div className="appBody">
            <Grid container>
              <Grid item xs={12}>
                <StockTable />
              </Grid>
              <Grid item xs={12}>
                <StockModal />
              </Grid>
            </Grid>
            <Register />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
