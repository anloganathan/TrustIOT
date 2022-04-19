import React from "react";

import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import '../styles/NavbarComp.css';

import {
  Switch,
  Route,
  Link
} from "react-router-dom";

const NavbarComp = (props) => {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">Trust IoT</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {/* <Nav.Link href="/devices">Devices</Nav.Link> */}
            {/* <Nav.Link href="/patients">Patients</Nav.Link> */}
            <Link to="/devices" className="navbar-link">Devices</Link>
            <Link to="/patients" className="navbar-link">Patients</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComp;