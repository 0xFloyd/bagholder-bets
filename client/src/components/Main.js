import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import Contact from "./Contact";
import Buy from "./Buy";
import Spinner from "./Spinner";

/*
class DebugRouter extends BrowserRouter {
  constructor(props) {
    super(props);
    console.log("initial history is: ", JSON.stringify(this.history, null, 2));
    this.history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      );
      console.log(
        `The last navigation action was ${action}`,
        JSON.stringify(this.history, null, 2)
      );
    });
  }
}*/

class Main extends Component {
  state = {
    name: "",
    email: "",
    msg: null
  };

  static propTypes = {
    auth: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object,
    clearErrors: PropTypes.func,
    isLoading: PropTypes.bool
  };

  render() {
    // this includes all the state values
    console.log("Main component rendered");
    const { isAuthenticated, isLoading } = this.props.auth;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              isAuthenticated={isAuthenticated}
              path="/login"
              component={Login}
            />
            <Route
              isAuthenticated={isAuthenticated}
              path="/register"
              component={Register}
            />
            <ProtectedRoute
              exact
              path="/"
              isAuthenticated={isAuthenticated}
              component={Home}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/contact"
              isAuthenticated={isAuthenticated}
              component={Contact}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/buy"
              isAuthenticated={isAuthenticated}
              component={Buy}
            ></ProtectedRoute>
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error,
  isloading: state.auth.isLoading
});

export default connect(mapStateToProps)(Main);
