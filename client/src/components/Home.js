import React, { Component, Fragment } from "react";
import StockTable from "./StockTable";
import StockModal from "./StockModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import Search from "./Search";
import { Col, Row } from "react-bootstrap";
import Spinner from "./Spinner";
import StockChart from "./PieChart";
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
    isLoading: PropTypes.bool
  };

  render() {
    // this includes all the state values

    //const currentBalance = numeral(user.balance).format("$0,0.00");

    return (
      <div>
        <NavBar />
        <Row className="justify-content-center">
          <Col>
            <Search />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <StockTable />
        </Row>
        <StockChart />
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

export default connect(mapStateToProps)(Home);
