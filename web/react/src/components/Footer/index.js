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
    FaInstagram
} from "react-icons/fa";

import { Link } from 'react-router-dom';

import './footer.css';

export default class Footer extends Component {
    render() {
        return (
           
            <Navbar color="dark" className=" mt-5 footer ">

                <Nav>

                    <Col className="col-md-2 col-sm-1">

                        <NavItem className="space-footer">

                            <img src="https://i.imgur.com/yUnaRMs.png" alt="logo do site" className="img-logo" />
                            

                        </NavItem>

                    </Col>

                    <Col className="col-md-3 col-sm-2 mr-2">
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
                                <NavItem>
                                    <Link className="text-muted" to="/"><img src="https://i.imgur.com/8NDSjxL.png" width="120px" height="40px" alt="cartoes" /></Link>
                                </NavItem>
                            </Nav>
                        </NavItem>
                    </Col>

                    <Col className="col-md-3 col-sm-2 mr-2">
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

                    <Col className="col-md-2 col-sm-1">

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
                                        Ligue (11) 93537-4847
                                   </Link>

                                </NavItem>
                            </Nav>
                        </NavItem>
                    </Col>

                    <Col>

                        <NavItem className="col-ms-2 col-sm-1">
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