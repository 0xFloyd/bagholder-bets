import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./NavBar";

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
        <NavBar></NavBar>
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
