import React, { Component, Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logout from "./Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../assets/wsb_logo.png";
import wsbphrase from "../assets/wsb.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "react-sidebar";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      name: "",
      email: "",
      password: "",
      msg: null,
      alertOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object,
    register: PropTypes.func,
    clearErrors: PropTypes.func
  };

  render() {
    // this includes all the state values
    const { isAuthenticated, user } = this.props.auth;

    const userLinks = (
      <Fragment>
        <Nav>
          <Nav.Link as={Link} to="/">
            <span className="mainSiteNavBarLink navbar-text mr-3">
              Portfolio
            </span>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/buy">
            <span className="mainSiteNavBarLink navbar-text mr-3">
              Buy Stock
            </span>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/contact">
            <span className="mainSiteNavBarLink navbar-text mr-3">Contact</span>
          </Nav.Link>
        </Nav>
        <Nav>
          <Logout />
        </Nav>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <Nav>
          <Nav.Link href="Register">Register</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="Login">Login</Nav.Link>
        </Nav>
      </Fragment>
    );

    return (
      <div>
        <Sidebar
          pullRight={true}
          sidebar={isAuthenticated ? userLinks : guestLinks}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        ></Sidebar>
        <Navbar expand="lg" variant="dark" className="mainSiteNavBar">
          <Link to="/">
            <img
              src={logo}
              alt="wsb logo"
              className="hide-on-desktop wsbNavLogo"
            ></img>
          </Link>
          <Link to="/">
            <img
              src={wsbphrase}
              alt="wsb logo"
              className="hide-on-mobile wsbPhraseLogo"
            ></img>
          </Link>
          <Nav className="mr-auto"></Nav>
          <Nav>{user ? "Balance: " + user.balance : ""}</Nav>
          <Nav className="hide-on-mobile">
            {isAuthenticated ? userLinks : guestLinks}
          </Nav>

          <button
            class="blankButton"
            onClick={() => this.onSetSidebarOpen(true)}
          >
            <FontAwesomeIcon icon={faEllipsisH} color="white" size="2x" />
          </button>
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
