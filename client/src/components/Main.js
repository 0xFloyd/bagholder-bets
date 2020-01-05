import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";

class Main extends Component {
  state = {
    name: "",
    email: "",
    msg: null
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  render() {
    // this includes all the state values
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute
              exact
              path="/"
              isAuthenticated={isAuthenticated}
              component={Home}
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
  error: state.error
});

export default connect(mapStateToProps)(Main);
