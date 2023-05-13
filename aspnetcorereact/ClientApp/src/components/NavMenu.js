import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavLink, Nav } from 'reactstrap';
import { Link as RRLink } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={RRLink} to="/">
            <img alt="logo" style={{ height: '2.5rem', width: '2.0rem' }} src={require("./pomubrand.png")}></img>
          </NavbarBrand>
          <Nav>
            <NavLink tag={RRLink} to="/" >
              Home
            </NavLink>
            <NavLink tag={RRLink} to="/counter" >
              Counter
            </NavLink>
            <NavLink tag={RRLink} to="/users" >
              Users
            </NavLink>
          </Nav>
        </Navbar>
      </header>
    );
  }
}
