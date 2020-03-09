import React, { Component } from 'react';

import {
    Collapse,
    Navbar,
    Container,
    NavbarToggler,
    NavbarBrand,
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

} from 'reactstrap';

import { Link } from 'react-router-dom';

import { MdPerson, MdSearch } from "react-icons/md";
import { IoMdCart } from 'react-icons/io';

import './header.css';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            logado: false
        }
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }


    search = (event) => {
        event.preventDefault();
    }

    render() {

        return (
            <header>
                <Navbar color="warning" light expand="md" className="mb-5">
                    <Container>
                        <Link to ="/"><NavbarBrand to="/"><img src="img/logo.png" alt="logo do site" className="img-logo" /></NavbarBrand></Link>
                        <NavbarToggler onClick={this.toggle} />
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
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <MdPerson size="30" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.state.logado ? (
                                            <DropdownItem >
                                                <Link to="/account">Minha conta</Link>
                                            </DropdownItem>) : (
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
