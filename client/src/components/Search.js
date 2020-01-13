import React, { Component } from "react";
import {
  Alert,
  Form,
  Row,
  Col,
  Button,
  Container,
  Table,
  FormControl,
  InputGroup,
  FormGroup
} from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { buyStock } from "../actions/stockActions";
var numeral = require("numeral");

class Search extends Component {
  state = {
    stock: null,
    data: "",
    ticker: "",
    price: "",
    percentChange: "",
    ytdChange: "",
    high: "",
    low: "",
    quantity: ""
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object,
    clearErrors: PropTypes.func,
    buyStock: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    //this.props.clearErrors();
    e.preventDefault();
    let ticker = e.target.elements.stockTicker.value;
    try {
      const searchStock = await fetch(
        `https://cloud.iexapis.com/v1/stock/${ticker}/quote/2?token=pk_764a7652cfde425785b349da624c23ac`,
        {
          mode: "cors"
        }
      ); //,{ mode: "cors" }
      const response = await searchStock.json();

      this.setState({
        data: response,
        stock: response.companyName,
        ticker: response.symbol,
        price: response.latestPrice,
        percentChange: numeral(response.changePercent).format("0.00%"),
        ytdChange: numeral(response.ytdChange).format("0.00%"),
        high: numeral(response.week52High).format("$0,0.00"),
        low: numeral(response.week52Low).format("$0,0.00")
      });
    } catch (error) {
      alert("No stock found matching ticker");
      document.getElementById("stockSearchForm").reset();
    }
  };

  buyStockSubmit = e => {
    //this.props.clearErrors();
    var userBuying = "No user";
    var value = "";
    //e.preventDefault();
    console.log("clicked");
    let quantity = e.target.elements.quantity.value;
    if (this.props.auth.user.id) {
      userBuying = this.props.auth.user.id;
    }

    if (quantity && this.state.price) {
      value = quantity * this.state.price;
    }

    const stockPurchase = {
      data: this.state.data,
      stock: this.state.stock,
      ticker: this.state.ticker,
      price: this.state.price,
      value: value,
      quantity: quantity,
      user: userBuying
    };

    // Try to buy stock
    this.props.buyStock(stockPurchase);

    this.setState({
      stock: null,
      data: "",
      ticker: "",
      price: "",
      percentChange: "",
      ytdChange: "",
      high: "",
      low: "",
      quantity: ""
    });

    document.getElementById("stockSearchForm").reset();
  };

  render() {
    return (
      <Container className="mt-3 mb-3">
        <Form id="stockSearchForm" onSubmit={this.onSubmit}>
          <InputGroup className="mt-3 mb-3">
            <FormControl
              name="stockTicker"
              placeholder="stock ticker"
              aria-label="stock ticker"
              onChange={this.onChange}
            />
            <InputGroup.Append>
              <Button
                className="input-group-btn stock-search-button"
                type="submit"
              >
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>

        <Row className="justify-content-center">
          <Col className="mt-3 mb-3 text-center">
            {this.state.stock
              ? this.state.ticker + ": $" + this.state.price
              : ""}
          </Col>
        </Row>
        {this.state.stock ? (
          <Container>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th className="text-center">Today</th>
                  <th className="text-center">YTD</th>
                  <th className="text-center">High</th>
                  <th className="text-center">Low</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">{this.state.percentChange}</td>
                  <td className="text-center">{this.state.ytdChange}</td>
                  <td className="text-center">{this.state.high}</td>
                  <td className="text-center">{this.state.low}</td>
                </tr>
              </tbody>
            </Table>
            {this.state.msg ? (
              <Alert variant="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.buyStockSubmit}>
              <Row>
                <Col xs={8} md={{ span: 2, offset: 4 }}>
                  <Form.Control
                    name="quantity"
                    onChange={this.onChange}
                    placeholder="quantity"
                  />
                </Col>
                <Col xs={4} md={{ span: 3 }}>
                  <Button className="stock-search-button" type="submit">
                    Buy
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { buyStock })(Search);

// stock is what we used in rootReducer

// all actions used in component go in second argument after mapStateToProps
