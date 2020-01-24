import React, { Component } from "react";
import logo from "../assets/wsb_logo.png";
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
  Navbar
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Login extends Component {
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

  onSubmit = e => {
    //console.log("logging in...");
    this.props.clearErrors();
    e.preventDefault();

    const { email, password } = this.state;

    const userLogin = {
      email: email,
      password: password
    };

    // Try to log in user
    this.props.login(userLogin);
  };

  render() {
    //console.log("Login component rendered");
    if (this.props.isAuthenticated === true) {
      return <Redirect push to="/" />;
    }
    return (
      <Container>
        <Row className="justify-content-center">
          <img src={logo} alt="wsb logo" className="wsbLoginLogo"></img>
        </Row>
        <Row className="justify-content-center mt-4">
          <h1>Log in</h1>
        </Row>
        {this.state.msg ? (
          <Alert variant="danger">{this.state.msg}</Alert>
        ) : null}
        <Row className="justify-content-center mt-3">
          <form
            onSubmit={this.onSubmit}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Form.Group className="justify-content-center">
              <Form.Label className="mb-0">Email Address</Form.Label>
              <Form.Control
                className="mt-0"
                id="email"
                label="Email Address"
                name="email"
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-0">Password</Form.Label>
              <Form.Control
                className="mt-0"
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.onChange}
              />
            </Form.Group>
                    <Row className="justify-content-center">

            <Button
              className="justify-content-center splash-form-button"
              type="submit"
            >
              Login
            </Button>
            </Row>
          </form>
        </Row>
        <Row className="mt-4 justify-content-center">
          <Nav.Link className="green-theme-text" href="register">
            {"Don't have an account? Sign Up"}
          </Nav.Link>
        </Row>
        <Navbar
          className="paper-shadow-class footer-bg justify-content-center"
          fixed="bottom"
        >
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

export default connect(mapStateToProps, { login, clearErrors })(Login);

/* Forgot Password. insert above "Already have an account" 
 <Row className="justify-content-center mt-4">
          <Nav.Link href="#" className="green-theme-text" variant="body2">
            Forgot password?
          </Nav.Link>
        </Row>
*/
