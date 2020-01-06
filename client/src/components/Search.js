import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default class Search extends Component {
  state = {
    stock: ""
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
        { mode: "cors" }
      ); //,{ mode: "cors" }
      const response = await searchStock.json();
      console.log(response);
      this.setState({
        stock:
          response.symbol + ": $" + Math.round(response.latestPrice * 100) / 100
      });
    } catch (error) {
      this.setState({ stock: "No stock found matching ticker" });
      alert("error in try/catch googleapi");
    }
  };

  render() {
    return (
      <Container className="mt-3 mb-3">
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col md={{ span: 2, offset: 4 }}>
              <Form.Control
                name="stockTicker"
                onChange={this.onChange}
                placeholder="enter ticker"
              />
            </Col>
            <Col md={{ span: 3 }}>
              <Button className="stock-search-button" type="submit">
                Search
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col className="mt-3  text-center">{this.state.stock}</Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

// stock is what we used in rootReducer

// all actions used in component go in second argument after mapStateToProps
