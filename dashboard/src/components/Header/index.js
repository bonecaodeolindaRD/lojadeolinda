import React, { Component } from 'react';

import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Container,
  NavLink
} from 'reactstrap';

import { Link } from 'react-router-dom';


export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      username: this.getUsername()
    }
    
  }

  getUsername = () => {
    if(!sessionStorage.getItem('user'))
      return;
    let  {username} = JSON.parse(sessionStorage.getItem('user'));
    return username;
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Container fluid>
            <NavbarBrand href="/home">{this.state.username}</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink>
                    <Link to="/home">Inicio</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link to="/create">Criar um produto</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link to="/add">Adicionar produto no estoque</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link to="/sales">Vendas</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link onClick={e => {
                      sessionStorage.removeItem('user');
                      window.location.reload();
                    }}>Sair</Link>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}
