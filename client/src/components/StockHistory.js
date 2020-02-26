import React, { Component } from "react";

import { connect } from "react-redux";

import { Row, Alert, Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { refreshUserData } from "../actions/userActions";

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
    success: PropTypes.object,
    user: PropTypes.object
  };

  // call api, or making action request, is done as component mounts

  render() {
    //stock represents entire state store. stocks is array of stocks inside
    //this.props.stock.stocks

    // this grabs stocks option from state

    const { user } = this.props.user;

    return (
      <div>
        <Row className="mt-4 mb-4 justify-content-center">
          <h1>Account</h1>
        </Row>
        <Container>
          {user ? (
            <div>
              <Row className="mt-4 mb-1 justify-content-center">
                <p>
                  <span style={{ fontStyle: "italic" }}>Name: </span>
                  {user.name}
                </p>
              </Row>
              <Row className="mt-1 mb-1 justify-content-center">
                <p>
                  <span style={{ fontStyle: "italic" }}>Email: </span>
                  {user.email}
                </p>
              </Row>
              <Row className="mt-1 mb-1 justify-content-center">
                {user ? (
                  <p>
                    <span style={{ fontStyle: "italic" }}>
                      Current Balance:{" "}
                    </span>
                    {user.balance.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD"
                    })}
                  </p>
                ) : null}
              </Row>
              <Row className="mt-1 mb-4 justify-content-center">
                {user.date ? (
                  <p>Account created on {user.date.split(",")[0]}</p>
                ) : null}
              </Row>
            </div>
          ) : null}
        </Container>
        <Row className="mt-4 mb-4 justify-content-center">
          <h3>History</h3>
        </Row>
        {this.state.msg ? (
          <Alert variant="danger">{this.state.msg}</Alert>
        ) : null}
        <Container>
          {user
            ? user.history.map(item => (
                <Row className="mt-2 mb-2 justify-content-center">
                  <Col className="paper-shadow-class mt-2 mb-2" xs={11} lg={12}>
                    <p className="stock-history-entry text-align-vertical text-align-center">
                      {item}
                    </p>
                  </Col>
                </Row>
              ))
            : null}
        </Container>
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
  success: state.success,
  user: state.user,
  history: state.user.history,
  balance: state.user.balance
});

// all actions used in component go in second argument after mapStateToProps
export default connect(mapStateToProps, { refreshUserData })(StockHistory);
