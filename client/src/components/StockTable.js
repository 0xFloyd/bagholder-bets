import React, { Component } from "react";

import { connect } from "react-redux";
import { getStocks, deleteStock } from "../actions/stockActions";
import { refreshUserData } from "../actions/userActions";
import { startLoading, endLoading } from "../actions/loadingActions";
import { Row, Button, Table, Alert, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import NumberFormat from "react-number-format";
import TestChart from "./TestChart";
import { Link } from "react-router-dom";

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

class StockTable extends Component {
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

  constructor() {
    super();
    this.state = {
      confirmSell: false,
      showModal: false,
      activeItem: ""
    };

    //this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  static propTypes = {
    getStocks: PropTypes.func.isRequired,
    deleteStock: PropTypes.func.isRequired,
    stock: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    success: PropTypes.object,
    user: PropTypes.object,
    isLoading: PropTypes.bool
  };

  // call api, or making action request, is done as component mounts

  componentDidMount() {
    if (this.props.auth) {
      this.props.getStocks(this.props.auth.user);
      this.props.refreshUserData(this.props.auth.user);
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onDeleteClick = async stock => {
    this.handleCloseModal();
    this.props.startLoading();
    try {
      const searchStock = await fetch(
        `https://cloud.iexapis.com/v1/stock/${stock.ticker}/quote/2?token=pk_764a7652cfde425785b349da624c23ac`,
        {
          mode: "cors"
        }
      ); //,{ mode: "cors" }
      const response = await searchStock.json();
      var price = response.latestPrice;
    } catch (error) {
      this.props.endLoading();
      alert("Couldn't sell stock");
    }

    var stockDelete = {
      user: this.props.auth.user,
      id: stock._id,
      price: price,
      quantity: stock.quantity,
      ticker: stock.ticker
    };

    await this.props.deleteStock(stockDelete);
    await this.props.refreshUserData(this.props.auth.user);
    this.props.endLoading();
  };

  handleOpenModal = item => {
    console.log(item);
    this.setState({ showModal: true, activeItem: item });
  };

  handleCloseModal() {
    this.setState({ showModal: false, activeItem: "" });
  }

  render() {
    //stock represents entire state store. stocks is array of stocks inside
    //this.props.stock.stocks

    // this grabs stocks option from stock state (stockReducer)
    const { stocks } = this.props.stock;
    return (
      <Container style={{ opacity: this.props.isLoading ? 0.5 : 1 }}>
        <Row className="mt-4 mb-2 justify-content-center">
          <h1>Portfolio</h1>
        </Row>
        <Row className="mb-2 justify-content-center">
          <TestChart />
        </Row>
        {this.state.msg ? (
          <Alert variant="danger">{this.state.msg}</Alert>
        ) : null}
        {stocks.length ? (
          <Container>
            <Table
              variant="dark"
              className="paper-shadow-class stock-table-background"
              aria-label="simple table"
            >
              <thead className="stock-table-header">
                <tr>
                  <th className="hide-on-mobile">Stock</th>
                  <th>Symbol</th>
                  <th>Buy Price</th>
                  <th>Quantity</th>
                  <th className="hide-on-mobile">Total</th>
                  <th>Sell</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map(item => (
                  <tr className="stock-table-row" key={item._id}>
                    <td className="hide-on-mobile">{item.stock}</td>
                    <td>{item.ticker}</td>
                    <td>
                      {Number(item.price).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                      })}
                    </td>
                    <td>
                      <NumberFormat
                        value={item.quantity}
                        displayType={"text"}
                        thousandSeparator={true}
                      ></NumberFormat>
                    </td>
                    <td className="hide-on-mobile">
                      {Number(item.value).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                      })}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={this.handleOpenModal.bind(this, item)}
                      >
                        Sell
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        ) : (
          <Container>
            <Row className="justify-content-center">
              <p>You don't currently own any stocks!</p>
            </Row>
            <Row className="justify-content-center">
              <Link to="/buy">
                <Button
                  className="justify-content-center splash-form-button"
                  type="button"
                >
                  Buy Stocks
                </Button>
              </Link>
            </Row>
          </Container>
        )}
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal.bind(this)}
          style={customStyles}
        >
          <p>
            Are you sure you want to sell {this.state.activeItem.quantity}{" "}
            share(s) of {this.state.activeItem.ticker} at the current market
            price?
          </p>
          <Button
            variant="danger"
            size="sm"
            onClick={this.onDeleteClick.bind(this, this.state.activeItem)}
          >
            Confirm sale
          </Button>
        </ReactModal>
      </Container>
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
  isLoading: state.loading.isLoading
});

// all actions used in component go in second argument after mapStateToProps
export default connect(mapStateToProps, {
  getStocks,
  deleteStock,
  refreshUserData,
  startLoading,
  endLoading
})(StockTable);
