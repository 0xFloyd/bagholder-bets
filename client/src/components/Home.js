import React, { Component, Fragment } from "react";
import StockTable from "./StockTable";
import StockModal from "./StockModal";
import StockHistory from "./StockHistory";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import { Col, Row } from "react-bootstrap";
import Spinner from "./Spinner";
import StockChart from "./PieChart";
import Footer from "./Footer";
import Footerv2 from "./Footerv2";
import StockNews from "./StockNews";
var numeral = require("numeral");

class Home extends Component {
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

  render() {
    // this includes all the state values

    //const currentBalance = numeral(user.balance).format("$0,0.00");

    return (
      <div>
        <NavBar />
        <Row className="justify-content-center">
          <StockTable />
        </Row>
        <Row>
          <StockNews />
        </Row>

        <Footerv2 />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error,
  isloading: state.auth.isLoading,
  user: state.user
});

export default connect(mapStateToProps)(Home);
