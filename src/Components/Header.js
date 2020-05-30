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
                <NavDropdown.Item href="/krd/Власть">Власть</NavDropdown.Item>
                <NavDropdown.Item href="/krd/Общество">Общество</NavDropdown.Item>
                <NavDropdown.Item href="/krd/Происшествия">Происшествия</NavDropdown.Item>
                <NavDropdown.Item href="/krd/Экономика">Экономика</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Сочи" id="basic-nav-dropdown">
                <NavDropdown.Item href="/sch">Все новости</NavDropdown.Item>
                <NavDropdown.Item href="/sch/Общество">Общество</NavDropdown.Item>
                <NavDropdown.Item href="/sch/Происшествия">Происшествия</NavDropdown.Item>
                <NavDropdown.Item href="/sch/Здравоохранение">Здравоохранение</NavDropdown.Item>
                <NavDropdown.Item href="/sch/Комунальные услуги">Комунальные услуги</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Новороссийск" id="basic-nav-dropdown">
                <NavDropdown.Item href="/nvr">Все новости</NavDropdown.Item>
                <NavDropdown.Item href="/nvr/ЖКХ">ЖКХ</NavDropdown.Item>
                <NavDropdown.Item href="/nvr/Городская среда">Городская среда</NavDropdown.Item>
                <NavDropdown.Item href="/nvr/Происшествия">Происшествия</NavDropdown.Item>
                <NavDropdown.Item href="/nvr/История">История</NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  };
};