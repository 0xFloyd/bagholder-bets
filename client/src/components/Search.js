import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default class Search extends Component {
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    //this.props.clearErrors();
    //e.preventDefault();
    //const { email, password } = this.state;
    // Try to log in user
    //this.props.login(userLogin);
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
                placeholder="search stock"
              />
            </Col>
            <Col md={{ span: 3 }}>
              <Button className="stock-search-button" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
