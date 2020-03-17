import React, { Component } from 'react';

import {
    Collapse,
    Navbar,
    Container,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    Button,
    InputGroupAddon,
    Input,
    Form,
    Label,

} from 'reactstrap';

import { Link } from 'react-router-dom';

import { MdPerson, MdSearch } from "react-icons/md";
import { IoMdCart } from 'react-icons/io';

import './header.css';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.getLogin();
        this.state = {
            isOpen: false,
            email: "",
            name: this.getLogin()
        }
    }

    getLogin = () => {
        let account = sessionStorage.getItem('client') ? JSON.parse(sessionStorage.getItem('client')) : "";
        console.log(account)
        this.setState({ 
            ...this.state,
            email: account.email,
            name : account.name
        });
        return account.name
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    logout = () => {
        sessionStorage.removeItem('client');
        sessionStorage.removeItem('cart');
        window.location.reload();
    }


    search = (event) => {
        event.preventDefault();
    }

    render() {
        const {name} = this.state;
        console.log('name')
        console.log(name)
        console.log(typeof name)
        console.log('name')

        return (
            <header>
                <Navbar color="warning" light expand="md" className="mb-5">
                    <Container>
                        <Link to ="/"><img src="https://i.imgur.com/5RAN6zL.png" alt="logo do site" className="img-logo" /></Link>
                        <NavbarToggler className="mb-2" onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="align-items-center justify-content-around w-100 display-menu">
                                <NavItem>
                                    <Link to="/components/"></Link>
                                </NavItem>
                                <Form onSubmit={this.search} className="search-input border">
                                    <InputGroup>
                                        <Input className="form-control border border-right-0" placeholder="Buscar..." />
                                        <InputGroupAddon addonType="append">
                                            <Button color="blue">
                                                <MdSearch size="20" color="blue" />
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Form>
                                <Label>Bem-Vindo(a) {this.state.name} </Label>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <MdPerson size="30" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {sessionStorage.getItem('client') ? (
                                            <>
                                            <DropdownItem >
                                                <Link to="/account">Minha conta</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link onClick={this.logout}>Sair</Link>
                                            </DropdownItem>
                                            </>) : (
                                                <>
                                                    <DropdownItem to="/login">
                                                        <Link to="/login">Logar </Link>
                                                    </DropdownItem>
                                                    <DropdownItem to="/register">
                                                        <Link to="/register">Registrar </Link>
                                                    </DropdownItem>
                                                </>)}

                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem>
                                    <Link to="/cart"><IoMdCart size="30" color="blue" /></Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
