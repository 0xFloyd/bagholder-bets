import React, { Component } from "react";
import StockTable from "./StockTable";

import StockHistory from "./StockHistory";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import { Col, Row } from "react-bootstrap";
import { refreshUserData } from "../actions/userActions";
import Footerv2 from "./Footerv2";

class Account extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    msg: null,
    alertOpen: false,
    isLoading: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object,
    register: PropTypes.func,
    clearErrors: PropTypes.func,
    isLoading: PropTypes.bool,
    user: PropTypes.object
  };

  componentDidMount() {
    this.props.refreshUserData(this.props.auth.user);
  }

  render() {
    // this includes all the state values

    //const currentBalance = numeral(user.balance).format("$0,0.00");

    return (
      <div>
        <NavBar />

        <StockHistory />
        <Footerv2 />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error,
  isloading: state.auth.isLoading,
  user: state.user
});

export default connect(mapStateToProps, { refreshUserData })(Account);
