import React, { Component } from "react";
import { Form, Row, Col, Button, Container, Table } from "react-bootstrap";
var numeral = require("numeral");

export default class Search extends Component {
  state = {
    stock: "",
    currentPice: "",
    percentChange: "",
    ytdChange: "",
    high: "",
    low: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    //this.props.clearErrors();
    e.preventDefault();
    console.log("clicked");
    this.setState({ stock: "loading..." });
    let ticker = e.target.elements.stockTicker.value;
    try {
      const searchStock = await fetch(
        `https://cloud.iexapis.com/v1/stock/${ticker}/quote/2?token=pk_764a7652cfde425785b349da624c23ac`,
        {
          mode: "cors"
        }
      ); //,{ mode: "cors" }
      const response = await searchStock.json();
      console.log(response);

      this.setState({
        stock:
          response.symbol +
          ": " +
          numeral(response.latestPrice).format("$0,0.00"),
        percentChange: numeral(response.changePercent).format("0.00%"),
        ytdChange: numeral(response.ytdChange).format("0.00%"),
        high: numeral(response.week52High).format("$0,0.00"),
        low: numeral(response.week52Low).format("$0,0.00")
      });
    } catch (error) {
      this.setState({ stock: "No stock found matching ticker" });
      alert("No stock found matching ticker");
    }
  };

  buyStock = async e => {
    //this.props.clearErrors();
    e.preventDefault();
    console.log("clicked");
    this.setState({ stock: "loading..." });
    let quantity = e.target.elements.quantity.value;
  };

  render() {
    return (
      <Container className="mt-3 mb-3">
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col xs={8} md={{ span: 2, offset: 4 }}>
              <Form.Control
                name="stockTicker"
                onChange={this.onChange}
                placeholder="enter ticker"
              />
            </Col>
            <Col xs={4} md={{ span: 3 }}>
              <Button className="stock-search-button" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="justify-content-center">
          <Col className="mt-3 mb-3 text-center">{this.state.stock}</Col>
        </Row>
        {this.state.stock !== "" ? (
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
            <Form onSubmit={this.buyStock}>
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

// stock is what we used in rootReducer

// all actions used in component go in second argument after mapStateToProps
