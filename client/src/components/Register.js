import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import logo from "../assets/wsb_logo.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Alert } from "react-bootstrap";

const styles = theme => ({
  root: {
    height: "90vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: green[500]
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: green[500],
    color: theme.palette.grey[50],
    "&:hover": {
      backgroundColor: green[400]
    }
  }
});

class Register extends Component {
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
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
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
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <img src={logo} alt="wsb logo" className="wsbLoginLogo"></img>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            {this.state.msg ? (
              <Alert variant="danger">{this.state.msg}</Alert>
            ) : null}
            <form className={classes.form} onSubmit={this.onSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.onChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already have an account? Log In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
  withStyles(styles)(Register)
);
