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
            <Navbar color="dark" className=" mt-5">
                <Nav>
                    <NavItem className="space-footer">
                        <img src="https://i.imgur.com/5RAN6zL.png" alt="logo do site" className="img-logo" />
                        <small className="d-block mb-3 text-muted">&copy; Bonecão de Olinda</small>
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
                                <Link  to="/" className="text-white" disabled>Redes sociais</Link>
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
                        <div>
                        <Link to="/" className="text-white" disabled>Contato</Link>
                        </div>
                        <div>
                            <Link className="text-muted" to="/contact">
                                Entrar em contato
                            </Link>
                            </div>
                    </NavItem>
                    <NavItem className="space-footer">
                     
                        <div>
                            <Link to="/" className="text-white" disabled>Sobre</Link>
                        </div>

                        <div>
                        <Link className="text-muted" to="/about">
                                Nossa História
                        </Link>
                        </div>
                  
                    </NavItem>
                </Nav>
            </Navbar>
        );

    }
}
