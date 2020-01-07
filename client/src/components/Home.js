import React, { Component, Fragment } from "react";
import StockTable from "./StockTable";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import Search from "./Search";
import { Col, Row } from "react-bootstrap";
var numeral = require("numeral");

class Home extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    msg: null,
    alertOpen: false
  };

  static propTypes = {
    auth: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object,
    register: PropTypes.func,
    clearErrors: PropTypes.func
  };

  render() {
    // this includes all the state values
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <NavBar />
        <Row className="justify-content-center">
          <Col className="mt-3 text-center">
            Balance {numeral(user.balance).format("$0,0.00")}
          </Col>
        </Row>
        <Row>
          <Col>
            <Search />
          </Col>
        </Row>
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
