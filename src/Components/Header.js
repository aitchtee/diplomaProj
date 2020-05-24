import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';

export default class Head extends Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="mb-4 p-4" >
          <Navbar.Brand href="/" style={{ fontSize: '30px' }} className="ml-5" >
            <Icon name='newspaper outline' />
              Новости
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav variant='pills' style={{ fontSize: '20px' }} className="mr-4">

              <NavDropdown title="Краснодар" id="basic-nav-dropdown">
                <NavDropdown.Item href="/krd">Все новости</NavDropdown.Item>
                <NavDropdown.Item href="/krd/auth">Власть</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/sch"> Сочи </Nav.Link>
              <Nav.Link> Новороссийск </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  };
};