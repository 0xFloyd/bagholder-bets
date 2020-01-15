import React, { Component } from "react";

import { connect } from "react-redux";

import { Row, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

class StockHistory extends Component {
  // when you bring in action from redux (ex: getStocks), it's store as react prop
  /*
Reacts propTypes is essentially a dictionary where you define 
what props your component needs and what type(s) they should be.
*/

  /*
connect takes in the map to the state, and then any actions we used in component, followed by the component 
in the second set of parentheses

mapStateToProps we want to map state into component property, so we can always access it from this.props.< whatever >
*/
  state = {
    isOpen: false,
    confirmSell: false
  };

  static propTypes = {
    stock: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    success: PropTypes.object
  };

  componentDidMount() {
    console.log(this.props.auth.user);
  }
  // call api, or making action request, is done as component mounts

  render() {
    //stock represents entire state store. stocks is array of stocks inside
    //this.props.stock.stocks

    // this grabs stocks option from state
    const { user } = this.props.auth;
    return (
      <div>
        <Row className="mt-4 justify-content-center">
          <h1>History</h1>
        </Row>
        {this.state.msg ? (
          <Alert variant="danger">{this.state.msg}</Alert>
        ) : null}

        <Row>
          {user
            ? user.history.map(item => (
                <h1>
                  {item}
                  <br></br>
                </h1>
              ))
            : null}
        </Row>
      </div>
    );
  }
}

// stock is what we used in rootReducer
const mapStateToProps = state => ({
  stock: state.stock,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error,
  success: state.success
});

// all actions used in component go in second argument after mapStateToProps
export default connect(mapStateToProps)(StockHistory);
