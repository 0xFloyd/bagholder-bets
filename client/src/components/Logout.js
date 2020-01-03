import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import Nav from "react-bootstrap/Nav";
import PropTypes from "prop-types";

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <Nav.Link onClick={this.props.logout} href="#">
          Logout
        </Nav.Link>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);
