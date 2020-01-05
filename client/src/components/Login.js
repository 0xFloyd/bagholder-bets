import React, { Component } from "react";
import logo from "../assets/wsb_logo.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Alert, Form, Container, Button, Nav } from "react-bootstrap";
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
    const { error } = this.props;
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
    /*
    if (this.props.isAuthenticated === true) {
      return <Redirect to="/" />;
    }*/

    return (
      <Container>
        <img src={logo} alt="wsb logo" className="wsbLoginLogo"></img>
        <h1>Sign in</h1>
        {this.state.msg ? (
          <Alert variant="danger">{this.state.msg}</Alert>
        ) : null}
        <form onSubmit={this.onSubmit}>
          <Form.Control
            id="email"
            label="Email Address"
            name="email"
            onChange={this.onChange}
          />
          <Form.Control
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={this.onChange}
          />
          <Button type="submit">Login</Button>

          <Nav.Link href="#" variant="body2">
            Forgot password?
          </Nav.Link>

          <Nav.Link href="register">
            {"Don't have an account? Sign Up"}
          </Nav.Link>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
