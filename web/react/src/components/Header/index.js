import React, { Component } from 'react';

import {
    Collapse,
    Navbar,
    Container,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
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

import { MdPerson, MdSearch} from "react-icons/md";
import { IoMdCart } from 'react-icons/io';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            logado: true
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
                        <NavbarBrand href="/"><img src="img/logo.png" alt="logo do site" className="img-logo" /></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="align-items-center justify-content-around w-100">
                                <NavItem>
                                    <NavLink href="/components/"></NavLink>
                                </NavItem>
                                    <Form onSubmit={this.search} className="search-input border">
                                        <InputGroup>
                                            <Input className="form-control border border-right-0" placeholder="Buscar..."/>
                                            <InputGroupAddon addonType="append">
                                                <Button color="blue">
                                                    <MdSearch size="20" color="blue" />
                                                </Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Form>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <MdPerson size="30"/>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.state.logado ? (
                                        <DropdownItem>
                                            Minha conta
                                        </DropdownItem>) : (
                                        <DropdownItem>
                                            Logar
                                        </DropdownItem>)}
                                        
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem>
                                    <IoMdCart size="30" color="blue"/>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>

            
        );
    }
}
