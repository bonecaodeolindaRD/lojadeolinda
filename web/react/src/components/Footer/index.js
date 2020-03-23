import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    Col,
    Row
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
           
            <Navbar color="dark" className=" mt-5 footer">

                <Nav>

                    <Col className="col-3">

                        <NavItem className="space-footer">

                            <img src="https://i.imgur.com/5RAN6zL.png" alt="logo do site" className="img-logo" />
                            <small className="d-block mb-3 text-muted">&copy; Bonecão de Olinda</small>

                        </NavItem>

                    </Col>

                    <Col className="col-3 mr-2">
                        <NavItem className="space-footer">
                            <Nav vertical>
                                <NavItem className="text-white">
                                    <Link to="/" className="text-white" disabled>Pagamento</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="text-muted" to="/">Cartão de crédito</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="text-muted" to="/">Cartão de débito</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="text-muted" to="/"><img src="https://www.valeriowagner.com.br/wp-content/uploads/2019/07/Cartao-que-aceitamos.jpg" width="120px" height="60px" alt="cartoes" /></Link>
                                </NavItem>
                            </Nav>
                        </NavItem>
                    </Col>

                    <Col className="col-3 mr-2">
                        <NavItem className="space-footer">
                            <Nav vertical>
                                <NavItem className="text-white">
                                    <Link to="/" className="text-white" disabled>Redes sociais</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="text-muted" to="/"><FaFacebook /> <h6>Bonecão de Olinda</h6></Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="text-muted" to="/"><FaInstagram /> <h6>@Bonecão_de_Olinda</h6></Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="text-muted" to="/"><FaTwitter /> <h6>@Bonecão_de_Olinda</h6></Link>
                                </NavItem>
                            </Nav>

                        </NavItem>
                    </Col>

                    <Col className="col-2">

                        <NavItem className="space-footer">
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
                                        <FaPhone/> (11) 93537-4847
                                   </Link>

                                </NavItem>
                            </Nav>
                        </NavItem>
                    </Col>

                    <Col>

                        <NavItem className="col-2">
                            <Row>
                                <div>
                                    <Link to="/" className="text-white" disabled>Sobre</Link>
                                </div>

                                <div>
                                    <Link className="text-muted" to="/about">
                                        Nossa História
                        </Link>
                                </div>
                            </Row>
                        </NavItem>
                    </Col>
                </Nav>
             
                <small className="d-block mb-3 text-muted d-flex justify-content-center">&copy; Direitos reservados</small>
              
            </Navbar >
          
        )
    }
}
