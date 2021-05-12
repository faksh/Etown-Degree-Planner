import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './App.css';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
    <div class="App-header">
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand> 
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            To learn more about this project, check out the Github Repository! -->
            <NavLink href="https://github.com/faksh/Etown-Degree-Planner">GitHub</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    </div>
    );
  }
}
