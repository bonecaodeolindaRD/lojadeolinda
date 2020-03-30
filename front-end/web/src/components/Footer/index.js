import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    Col
} from 'reactstrap';

import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaPhone
} from "react-icons/fa";

import { Link } from 'react-router-dom';

import './footer.css';

export default class Footer extends Component {
    render() {
        return (
            <>

                <Navbar color="dark" className=" mt-5 d-flex">

                    <Nav className="w-100 justify-content-around">

                        <Col className="col-md-2 col-sm-1">

                            <NavItem>


                                <img src="https://i.imgur.com/yUnaRMs.png" alt="logo do site" className="img-logo" />


                            </NavItem>

                        </Col>

                        <Col md="2">
                            <NavItem>
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
                                    <NavItem>
                                        <Link className="text-muted" to="/"><img src="https://i.imgur.com/8NDSjxL.png" width="120px" height="40px" alt="cartoes" /></Link>
                                    </NavItem>
                                </Nav>
                            </NavItem>
                        </Col>

                        <Col md="2">
                            <Nav vertical>
                                <NavItem className="text-white">
                                    <Link to="/" className="text-white" disabled>Redes sociais</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="text-muted " to="/"><FaFacebook /> <h6>Bonecão de Olinda</h6></Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="text-muted" to="/"><FaTwitter /> <h6>@Bonecão_de_Olinda</h6></Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="text-muted " to="/"><FaInstagram /> <h6>@Bonecão_de_Olinda</h6></Link>
                                </NavItem>
                            </Nav>
                        </Col>

                        <Col md="2">

                            <NavItem>
                                <Nav vertical>
                                    <NavItem>

                                        <Link to="/" className="text-white" disabled>Contato</Link>
                                    </NavItem>
                                </Nav>
                            </NavItem>


                            <NavItem>
                                <Nav vertical>
                                    <NavItem>
                                        <Link className="text-muted" to="/contact">
                                            Entrar em contato
                                   </Link>

                                    </NavItem>

                                    <NavItem>
                                        <Link className="text-muted" to="/contact">
                                            <FaPhone /> (11) 93537-4847
                                   </Link>

                                    </NavItem>
                                </Nav>
                            </NavItem>
                        </Col>


                        <Col md="2">

                            <NavItem>
                                <Nav vertical>
                                    <NavItem >
                                        <Link to="/" className="text-white" disabled>Sobre</Link>
                                    </NavItem>

                                    <NavItem>
                                        <Link className="text-muted" to="/about">
                                            Nossa História
                                         </Link>
                                    </NavItem>
                                </Nav>
                            </NavItem>
                        </Col>

                       
                    </Nav>

                </Navbar >

                <Navbar color="dark" className="d-flex justify-content-center" >
                    <small className="d-block mb-3 text-muted d-flex justify-content-center">&copy; Direitos reservados  CNPJ: 12.432.123/0007-70 /
                     Inscrição Estadual: 283.382.938.635
                     / Av. Corifeu de Azevedo Marques, 3097 - Vila Butantã- São Paulo - SP, 05360-070
                  /bonecaodeolinda@gmail.com.br</small>

                </Navbar>
            </>
        )
    }
}