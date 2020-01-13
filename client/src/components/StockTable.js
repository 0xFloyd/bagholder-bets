import React, { Component } from "react";

import { connect } from "react-redux";
import { getStocks, deleteStock } from "../actions/stockActions";
import { Row, Button, Table } from "react-bootstrap";
import PropTypes from "prop-types";

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
  state = {
    isOpen: false,
    confirmSell: false
  };

  static propTypes = {
    getStocks: PropTypes.func.isRequired,
    deleteStock: PropTypes.func.isRequired,
    stock: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired
  };

  // call api, or making action request, is done as component mounts
  componentDidMount() {
    this.props.getStocks(this.props.auth.user);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onDeleteClick = async stock => {
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
      alert("Couldn't sell stock");
    }

    var stock = {
      user: this.props.auth.user,
      id: stock._id,
      price: price,
      quantity: stock.quantity
    };

    this.props.deleteStock(stock);
  };
  render() {
    //stock represents entire state store. stocks is array of stocks inside
    //this.props.stock.stocks

    // this grabs stocks option from state
    const { stocks } = this.props.stock;
    return (
      <div>
        <Row className="justify-content-center">
          <h1>Portfolio</h1>
        </Row>

        <Table aria-label="simple table">
          <thead>
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
              <tr key={item._id}>
                <td className="hide-on-mobile">{item.stock}</td>
                <td>{item.ticker}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td className="hide-on-mobile">${Math.round(item.value)}</td>
                <td>
                  {this.props.isAuthenticated ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, item)}
                    >
                      Sell
                    </Button>
                  ) : (
                    <p>Please log in</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

// stock is what we used in rootReducer
const mapStateToProps = state => ({
  stock: state.stock,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

// all actions used in component go in second argument after mapStateToProps
export default connect(mapStateToProps, { getStocks, deleteStock })(StockTable);
