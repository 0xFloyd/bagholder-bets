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
import { refreshUserData } from "../actions/userActions";
//import SideBar from "./SideBar";
import { slide as Menu } from "react-burger-menu";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      msg: null,
      alertOpen: false
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object,
    register: PropTypes.func,
    clearErrors: PropTypes.func,
    stock: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  render() {
    // this includes all the state values
    const { isAuthenticated } = this.props.auth;
    const { user } = this.props.user;
    const { balance } = this.props.user;
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
          <Nav.Link as={Link} to="/account">
            <span className="mainSiteNavBarLink navbar-text mr-3">Account</span>
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
        <Menu right outerContainerId={"App"}>
          {isAuthenticated ? userLinks : guestLinks}
        </Menu>
        <Navbar
          expand="lg"
          variant="light"
          className="paper-shadow-class mainSiteNavBar"
        >
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
          <Nav className="hide-on-mobile">
            <span className="bold-text">
              {user
                ? "Balance: " +
                  user.balance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                  })
                : ""}
            </span>
          </Nav>
          <Nav className="navbar-desktop-links hide-on-mobile">
            {isAuthenticated ? userLinks : guestLinks}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error,
  stock: state.stock,
  user: state.user,
  balance: state.user.balance
});

export default connect(mapStateToProps, { refreshUserData })(NavBar);
