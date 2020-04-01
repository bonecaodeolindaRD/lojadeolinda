import React, { Component } from 'react';
import axios from 'axios';

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
            categories: [],
            category: 0,
            email: "",
            name: this.getLogin(),
            
            loading: false
        }
        this.getCategories();
    }

    getCategories = async () => {
        const { data: category } = await axios("http://localhost:8080/ecommerce/category/");
        if (!category)
            return;
        this.setState({ categories: category });
    }


    getLogin = () => {
        let account = "";
        if (sessionStorage.getItem('client'))
            account = JSON.parse(sessionStorage.getItem('client'));
        else
            return;
        this.setState({
            ...this.state,
            email: account.email,
            name: account.name
        });
        return account.name.indexOf(" ") < 0 ? account.name : account.name.substring(0, account.name.indexOf(" "));
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    logout = () => {
        sessionStorage.removeItem('client');
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem("dG9rZW4=");
        window.location.reload();
    }

   

    search = (event) => {
        event.preventDefault();
        const form = event.target;
        const inputGroup = form.children[0];
        const inputText = inputGroup.children[1];
        this.props.history.push('/search/' + inputText.value);
        let local = this.props.location.pathname.split('/');
        console.log(local);
        if (local[1] === 'search')
            window.location.reload();
    }

    render() {
        return (
            <header>
                <Navbar color="warning" light expand="md" className="mb-5">
                    <Container className="col-12">
                        <Link to="/"><img src="https://i.imgur.com/5gjaQsy.png" alt="logo do site" className="img-logo" /> </Link>
                        <NavbarToggler className="mb-2" onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="align-items-center justify-content-around w-100 display-menu">
                                <NavItem>
                                    <Link to="/components/"></Link>
                                </NavItem>
                                <Form onSubmit={this.search} className="search-input border rounded p-1">
                                    <InputGroup >
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                                Categorias
                                            </DropdownToggle>
                                            <DropdownMenu right  value={this.state.category} onChange={e => this.setState({ category: e.target.value }) } >
                                            {this.state.categories.map(c => (
                                           <Link  onClick={ e => this.props.history.push("/category/" + c.id) + window.location.reload()} > <DropdownItem >{c.name}</DropdownItem></Link>
                                             ))}  
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <Input className="form-control border border-right-0 rounded" placeholder="O que deseja encontrar?" />
                                        <InputGroupAddon addonType="append">
                                            <Button color="blue">
                                                <MdSearch size="20" color="blue" />
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Form>
                                <Label><h6>Bem-Vindo(a) <br />{this.state.name}</h6></Label>
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
                                                <DropdownItem >
                                                    <Link to="/history">Minhas Compras</Link>
                                                </DropdownItem>
                                                <DropdownItem >
                                                    <Link to="/address">Endereços</Link>
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