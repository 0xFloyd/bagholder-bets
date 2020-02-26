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
  InputGroup
} from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { buyStock } from "../actions/stockActions";
import { refreshUserData } from "../actions/userActions";
import NavBar from "./NavBar";
import ReactModal from "react-modal";
import Footerv2 from "./Footerv2";
require("dotenv").config();
var numeral = require("numeral");

ReactModal.setAppElement("#root");

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.25)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Search extends Component {
  constructor() {
    super();
    this.state = {
      confirmSell: false,
      showModal: false,
      activeItem: "",
      stock: null,
      data: "",
      ticker: "",
      price: "",
      percentChange: "",
      ytdChange: "",
      high: "",
      low: "",
      quantity: "",
      isEnabled: false
    };
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object,
    user: PropTypes.object,
    clearErrors: PropTypes.func,
    buyStock: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onQuantityChange = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ quantity: e.target.value, isEnabled: true });
    }
  };

  handleOpenModal = e => {
    e.preventDefault();
    console.log(e);
    let quantity = e.target.elements.quantity.value;
    this.setState({ showModal: true, quantity: quantity });
  };

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  onSubmit = async e => {
    //this.props.clearErrors();
    e.preventDefault();
    let ticker = e.target.elements.stockTicker.value;
    try {
      const searchStock = await fetch(
        `https://cloud.iexapis.com/v1/stock/${ticker}/quote/2?token=${process.env.REACT_APP_IEX_TOKEN}`,
        {
          mode: "cors"
        }
      ); //,{ mode: "cors" }
      const response = await searchStock.json();

      // temporarily show stock metrics so user can decide if they want to buy stock
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

  buyStockSubmit = () => {
    //this.props.clearErrors();
    this.handleCloseModal();
    var userBuying = this.props.auth.user;
    var value = "";
    //e.preventDefault();
    //let quantity = e.target.elements.quantity.value;

    /*
    if (this.props.auth.user._id) {
      userBuying = this.props.auth.user._id;
    } */

    if (this.state.quantity && this.state.price) {
      value = this.state.quantity * this.state.price;
    }

    const stockPurchase = {
      data: this.state.data,
      stock: this.state.stock,
      ticker: this.state.ticker,
      price: this.state.price,
      value: value,
      quantity: this.state.quantity,
      user: userBuying.id
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
      quantity: "",
      isEnabled: true
    });

    document.getElementById("stockSearchForm").reset();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <NavBar />
        <Row className="mt-4 justify-content-center">
          <h1>Search</h1>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <Container className="mt-3 mb-3">
              <Row className="justify-content-center">
                <Col xs={11} md={6}>
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
                </Col>
              </Row>

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
                        <td className="text-center">
                          {this.state.percentChange}
                        </td>
                        <td className="text-center">{this.state.ytdChange}</td>
                        <td className="text-center">{this.state.high}</td>
                        <td className="text-center">{this.state.low}</td>
                      </tr>
                    </tbody>
                  </Table>
                  {this.state.msg ? (
                    <Alert variant="danger">{this.state.msg}</Alert>
                  ) : null}
                  <Form onSubmit={this.handleOpenModal.bind(this)}>
                    <Row>
                      <Col xs={8} md={{ span: 2, offset: 4 }}>
                        <Form.Control
                          name="quantity"
                          onChange={this.onQuantityChange}
                          placeholder="quantity"
                          value={this.state.quantity}
                        />
                      </Col>
                      <Col xs={4} md={{ span: 3 }}>
                        <Button
                          disabled={!this.state.isEnabled}
                          className="stock-search-button"
                          type="submit"
                        >
                          Buy
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Container>
              ) : null}
            </Container>
          </Col>
        </Row>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal.bind(this)}
          style={customStyles}
        >
          <p>
            Are you sure you want to buy {" " + this.state.quantity + " "}
            share(s) of {this.state.ticker} at{" "}
            {Number(this.state.price).toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            }) + " "}{" "}
            each?
          </p>
          <Button
            variant="danger"
            size="sm"
            onClick={this.buyStockSubmit.bind(this)}
          >
            Confirm sale
          </Button>
        </ReactModal>
        <Footerv2 />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error,
  user: state.user
});

export default connect(mapStateToProps, { buyStock, refreshUserData })(Search);

// stock is what we used in rootReducer

// all actions used in component go in second argument after mapStateToProps
