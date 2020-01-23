import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  Alert,
  Form,
  Container,
  Button,
  Nav,
  Row,
  Col,
  Navbar
} from "react-bootstrap";

export default class Footerv2 extends Component {
  render() {
    return (
      <footer className="main-app-footer">
        <Nav>
          <Nav.Link
            className="green-theme-text"
            href="https://www.linkedin.com/in/ryan-floyd/"
          >
            Project by Ryan Floyd
          </Nav.Link>
          <Nav.Link
            className="green-theme-text"
            href="https://www.linkedin.com/in/ryan-floyd/"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </Nav.Link>
          <Nav.Link
            className="green-theme-text"
            href="https://github.com/MrRyanFloyd"
          >
            <FontAwesomeIcon className="fa-1.5x" icon={faGithub} />
          </Nav.Link>
          <Nav.Link className="green-theme-text" href="https://iexcloud.io">
            Data provided by IEX Cloud
          </Nav.Link>
        </Nav>
      </footer>
    );
  }
}
