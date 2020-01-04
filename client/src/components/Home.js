import React, { Component, Fragment } from "react";
import StockTable from "./StockTable";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./NavBar";

class Home extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    msg: null,
    alertOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  render() {
    // this includes all the state values
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <NavBar />
        <StockTable />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps)(Home);
