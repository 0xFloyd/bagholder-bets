import React, { Component, Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logout from "./Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class NavBar extends Component {
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

    const userLinks = (
      <Fragment>
        <Nav>
          <Nav.Link>
            <span className="navbar-text mr-3">
              <strong>{user ? `Welcome ${user.name}` : ""}</strong>
            </span>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#logout">
            <Logout />
          </Nav.Link>
        </Nav>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <Nav>
          <Nav.Link href="#Register">Register</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#Login">Login</Nav.Link>
        </Nav>
      </Fragment>
    );

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Wall Street Bets</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav>{isAuthenticated ? userLinks : guestLinks}</Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps)(NavBar);
