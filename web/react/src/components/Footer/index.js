import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    NavItem
} from 'reactstrap';

import {
    FaFacebook,
    FaTwitter,
    FaInstagram
} from "react-icons/fa";

import { Link } from 'react-router-dom';

import './footer.css';

export default class Footer extends Component {
    render() {
        return (
            <Navbar color="dark" className="mt-5">
                <Nav>
                    <NavItem className="space-footer">
                        <img src="img/logo.png" alt="logo do site" className="img-logo" />
                        <small class="d-block mb-3 text-muted">&copy; Bonecão de Olinda</small>
                    </NavItem>
                    <NavItem className="space-footer">
                        <Nav vertical>
                            <NavItem className="text-white">
                                <Link to="/" className="text-white" disabled>Pagamento</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="text-muted" to="/">Cartão de credito</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="text-muted" to="/">Cartão de débito</Link>
                            </NavItem>
                        </Nav>
                    </NavItem>
                    <NavItem className="space-footer">
                        <Nav vertical>
                            <NavItem className="text-white h-5">
                                <Link href="#" className="text-white" disabled>Redes sociais</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="text-muted" to="/"><FaFacebook /></Link>
                            </NavItem>
                            <NavItem>
                                <Link className="text-muted" to="/"><FaInstagram /></Link>
                            </NavItem>
                            <NavItem>
                                <Link className="text-muted" to="/"><FaTwitter /></Link>
                            </NavItem>
                        </Nav>
                    </NavItem>
                    <NavItem className="space-footer">
                        <NavItem className="text-white h-5">
                            <Link to="/" className="text-white" disabled>Contato</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="text-muted" to="/contact">
                                Entrar em contato
                            </Link>
                        </NavItem>
                    </NavItem>
                    <NavItem className="space-footer">
                        <NavItem className="text-white h-5">
                            <Link to="/" className="text-white" disabled>Sobre</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="text-muted" to="/about">
                                Nossa historia
                            </Link>
                        </NavItem>
                    </NavItem>
                </Nav>
            </Navbar>
        );

    }
}
