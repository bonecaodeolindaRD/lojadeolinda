import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import {
    FaFacebook,
    FaTwitter,
    FaInstagram
} from "react-icons/fa";

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
                            <NavItem className="text-white h5">
                                <NavLink href="#" className="text-white" disabled>Pagamento</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-muted" href="#">Cartão de credito</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-muted" href="#">Cartão de débito</NavLink>
                            </NavItem>
                        </Nav>
                    </NavItem>
                    <NavItem className="space-footer">
                        <Nav vertical>
                            <NavItem className="text-white h-5">
                                <NavLink href="#" className="text-white" disabled>Redes sociais</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-muted" href="#"><FaFacebook /></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-muted" href="#"><FaInstagram /></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-muted" href="#"><FaTwitter /></NavLink>
                            </NavItem>
                        </Nav>
                    </NavItem>
                    <NavItem className="space-footer">
                        <NavItem className="text-white h-5">
                            <NavLink href="#" className="text-white" disabled>Contato</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-muted" href="/contact">
                                Entrar em contato
                            </NavLink>
                        </NavItem>
                    </NavItem>
                    <NavItem className="space-footer">
                        <NavItem className="text-white h-5">
                            <NavLink href="#" className="text-white" disabled>Sobre</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink className="text-muted" href="/about">
                                Nossa historia
                            </NavLink>
                        </NavItem>
                    </NavItem>
                </Nav>
            </Navbar>
        );

    }
}
