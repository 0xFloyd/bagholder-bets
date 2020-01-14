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
        <Nav>
          <Nav.Link
            className="navbar-text"
            onClick={this.props.logout}
            href="#"
          >
            <span className="mainSiteNavBarLink navbar-text mr-3">Logout</span>
          </Nav.Link>
        </Nav>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);
