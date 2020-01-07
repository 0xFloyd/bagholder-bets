import React, { Component, Fragment } from "react";
import StockTable from "./StockTable";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import Search from "./Search";
import { Col, Row } from "react-bootstrap";
import Spinner from "./Spinner";
var numeral = require("numeral");

class Home extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    msg: null,
    alertOpen: false,
    loading: false
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props !== prevProps) {
      this.setState({ loading: true });
    }
  }

  static propTypes = {
    auth: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object,
    register: PropTypes.func,
    clearErrors: PropTypes.func
  };

  render() {
    // this includes all the state values
    const { isAuthenticated, user, loading } = this.props.auth;
    const currentBalance = numeral(user.balance).format("$0,0.00");

    return (
      <div>
        {isAuthenticated !== null ? (
          <div>
            <NavBar />
            <Row className="justify-content-center">
              <Col className="mt-3 text-center">
                {loading ? "loading..." : currentBalance}
              </Col>
            </Row>
            <Row>
              <Col>
                <Search />
              </Col>
            </Row>
          </div>
        ) : (
          <Spinner className="fullscreenSpinner"></Spinner>
        )}
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
