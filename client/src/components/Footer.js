import React, { Component } from "react";
import logo from "../assets/wsb_logo.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  Alert,
  Form,
  Container,
  Button,
  Nav,
  Row,
  Col,
  Navbar
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Footer extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    msg: null,
    alertOpen: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  // Lifecylce method for when component updates. takes in previous props as arg

  render() {
    //console.log("Login component rendered");

    return (
      <Container>
        <Navbar className="footer-bg justify-content-center" sticky="bottom">
          <Nav className="justify-content-around">
            <Nav.Link
              className="green-theme-text"
              href="https://www.linkedin.com/in/ryan-floyd/"
            >
              Project by Ryan Floyd
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="green-theme-text"
              href="https://www.linkedin.com/in/ryan-floyd/"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="green-theme-text"
              href="https://github.com/MrRyanFloyd"
            >
              <FontAwesomeIcon className="fa-1.5x" icon={faGithub} />
            </Nav.Link>
          </Nav>

          <Nav.Link className="green-theme-text" href="https://iexcloud.io">
            Data provided by IEX Cloud
          </Nav.Link>
        </Navbar>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps)(Footer);
