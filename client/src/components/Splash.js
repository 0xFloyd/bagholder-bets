import React, { Component } from "react";
import logo from "../assets/wsb_logo.png";
import splashImage from "../assets/splash-image.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
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
  Navbar,
  Image
} from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";

class Splash extends Component {
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
  componentDidUpdate(prevProps) {
    // we have access to this in props, you can see in redux tools
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "LOGIN_FAIL") {
        // if you inspect with redux tools, message is embedded in message
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleAlert = () => {
    alert(this.state.msg);
    this.props.clearErrors();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    //console.log("Login component rendered");
    if (this.props.isAuthenticated === true) {
      return <Redirect push to="/" />;
    }
    return (
      <div>
        <Row className="spacer-row"></Row>
        <Row className="justify-content-center">
          <Col lg={6}>
            <div className="splash-form-left-div">
              <Row className="justify-content-center ">
                <Image
                  src={logo}
                  alt="wsb logo"
                  className="paper-shadow-class splashImageFace"
                ></Image>
              </Row>
              <Row className="mt-4 justify-content-center">
                <h1>Bagholder Bets</h1>
              </Row>

              <Row className=" justify-content-center">
                <h3>It's time to lose money.</h3>
              </Row>

              <Row className="mt-2 justify-content-center">
                <Link className="green-theme-text" to="/register">
                  <Button className="mr-3 splash-form-button">Sign Up</Button>
                </Link>
                <Link className="green-theme-text" to="/login">
                  <Button className="ml-3 splash-form-button">Log In</Button>
                </Link>
              </Row>
              <Row className="mt-4 hide-on-mobile justify-content-center">
                <Col className="mt-4" xs={6}>
                  <p className="text-center">
                    Practice losing OUR money trading stocks before you lose
                    YOUR money out in the real world!
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={6}>
            <Row className="justify-content-center">
              <Image className="splashImage" src={splashImage}></Image>
            </Row>
          </Col>
        </Row>

        <Navbar
          className="paper-shadow-class footer-bg justify-content-center"
          fixed="bottom"
        >
          <Nav className="justify-content-around">
            <Nav.Link
              className="green-theme-text"
              style={{
                fontSize: "0.8rem"
              }}
              href="https://www.linkedin.com/in/ryan-floyd/"
            >
              Bagholder's Bets, a Ryan Floyd Project
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
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Splash);

/* Forgot Password. insert above "Already have an account" 
 <Row className="justify-content-center mt-4">
          <Nav.Link href="#" className="green-theme-text" variant="body2">
            Forgot password?
          </Nav.Link>
        </Row>
*/
