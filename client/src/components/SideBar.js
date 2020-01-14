import React from "react";
import Sidebar from "react-sidebar";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <Sidebar
        pullRight={true}
        sidebar={
          <div>
            <Nav.Link as={Link} to="/contact">
              <span className="navbar-text mr-3">Contact</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <span className="navbar-text mr-3">Home</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              <span className="navbar-text mr-3">Contact</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <span className="navbar-text mr-3">Home</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              <span className="navbar-text mr-3">Contact</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <span className="navbar-text mr-3">Home</span>
            </Nav.Link>
          </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>Menu</button>
      </Sidebar>
    );
  }
}

export default SideBar;
