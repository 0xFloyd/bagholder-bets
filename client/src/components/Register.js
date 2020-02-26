import React, { Component } from "react";
import logo from "../assets/wsb_logo.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import {
  Alert,
  Form,
  Container,
  Button,
  Nav,
  Row,
  Navbar
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Redirect } from "react-router-dom";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      msg: null,
      alertOpen: false,
      name: "",
      email: "",
      password: "",
      errors: {
        name: "",
        email: "",
        password: ""
      }
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "name":
        errors.name =
          value.length < 2 ? "Name must be at least 2 characters long" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "Please enter a valid email address";
        break;
      case "password":
        errors.password =
          value.length < 6 ? "Password must be at least 6 characters long" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  // Lifecylce method for when component updates. takes in previous props as arg
  componentDidUpdate(prevProps) {
    // we have access to this in props, you can see in redux tools
    const { error } = this.props;
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "REGISTER_FAIL") {
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

  canBeSubmitted = () => {
    const { name, email, password, errors } = this.state;
    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      errors.name === "" &&
      errors.email === "" &&
      errors.password === ""
    );
  };

  onSubmit = e => {
    if (!this.canBeSubmitted()) {
      e.preventDefault();
      return;
    }

    this.props.clearErrors();
    e.preventDefault();

    const { name, email, password } = this.state;

    // Create user object

    const newUser = {
      name: name,
      email: email,
      password: password
    };

    //attempt to register new user
    this.props.register(newUser);
  };

  render() {
    if (this.props.isAuthenticated === true) {
      return <Redirect to="/" />;
    }
    const isEnabled = this.canBeSubmitted();
    const { errors } = this.state;
    return (
      <Container>
        <Row className="mt-4 justify-content-center">
          <img
            src={logo}
            alt="wsb logo"
            className="paper-shadow-class splashImageFace"
          ></img>
        </Row>
        <Row className="justify-content-center mt-4">
          <h1>Sign Up</h1>
        </Row>
        {this.state.msg ? (
          <Alert variant="danger">{this.state.msg}</Alert>
        ) : null}
        <Row className="justify-content-center mt-3">
          <form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Label className="mb-0">Username</Form.Label>
              <Form.Control
                className="mt-0"
                id="name"
                label="name"
                name="name"
                onChange={this.handleChange}
              />
              {errors.name.length > 0 && (
                <span className="error">{errors.name}</span>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-0">Email Address</Form.Label>
              <Form.Control
                className="mt-0"
                id="email"
                label="Email Address"
                name="email"
                onChange={this.handleChange}
              />{" "}
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-0">Password</Form.Label>
              <Form.Control
                className="mt-0"
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.handleChange}
              />{" "}
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </Form.Group>
            <Row className="justify-content-center">
              <Button
                disabled={!isEnabled}
                className="splash-form-button"
                type="submit"
              >
                Login
              </Button>
            </Row>
          </form>
        </Row>
        <Row className="mt-4 justify-content-center">
          <Nav.Link className="green-theme-text" href="login">
            {"Already have an account? Log In"}
          </Nav.Link>
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
              Bagholder Bets by Ryan Floyd
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
