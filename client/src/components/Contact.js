import React, { Component } from "react";
import NavBar from "./NavBar";
import { Row, Form, Button, Col, Container } from "react-bootstrap";
import Footerv2 from "./Footerv2";
const axios = require("axios");

export default class Contact extends Component {
  handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const messageButton = document.getElementById("messageSubmitButton");

    var oldValue = messageButton.value;

    messageButton.setAttribute("hidden", true);
    messageButton.value = "sending...";

    axios({
      method: "POST",
      url: "http://localhost:5000/api/email",
      data: {
        name: name,
        email: email,
        message: message
      }
    }).then(response => {
      if (response.data.msg === "success") {
        alert("Message Sent.");
        this.resetForm();
        messageButton.value = oldValue;
        messageButton.removeAttribute("hidden");
      } else if (response.data.msg === "fail") {
        alert("Message failed to send.");
        messageButton.value = oldValue;
        messageButton.removeAttribute("hidden");
      }
    });
  }

  resetForm() {
    document.getElementById("contact-form").reset();
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Row className="mt-4  justify-content-center">
            <h3 className="text-align-center">Send me a message!</h3>
          </Row>

          <Row className="justify-content-center">
            <Col xs={11} md={6}>
              <Form
                id="contact-form"
                onSubmit={this.handleSubmit.bind(this)}
                method="POST"
              >
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control id="name" placeholder="name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control id="email" placeholder="email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    id="message"
                    as="textarea"
                    placeholder="message"
                  />
                </Form.Group>
                <Form.Group>
                  <Row className="mt-4 mb-2 justify-content-center">
                    <Button
                      className="justify-content-center splash-form-button"
                      type="submit"
                      id="messageSubmitButton"
                    >
                      Send
                    </Button>
                  </Row>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
        <Footerv2 />
      </div>
    );
  }
}
