import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';
import { Container, Table, Button } from 'reactstrap';
import './styles.css'
import { Link } from 'react-router-dom';

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: []
        }
        if (!sessionStorage.getItem('client')) {
            this.props.history.push('/');
            return;
        }
        this.getAddresses();
    }

    getAddresses = async () => {
        const { email } = JSON.parse(sessionStorage.getItem('client'));
        let { data: add } = await axios("http://localhost:8080/ecommerce/client/addresses/" + email);
        this.setState({
            addresses: add.addresses
        })
    }

    getAddresses(e) {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <Header />
                {this.state.addresses ? (
                    <Container className="align-center">
                        <h3 align="center">Meus Endereços</h3>
                        <div className="text-align-center" align="center">
                                <Button to="/new/adress" className="btn btn-success mr-3" > Cadastrar </Button>
                            </div>
                        <Table bordered className="table table-striped" style={{ marginTop: 20 }} >
                            <thead>
                                <tr align="center">
                                    <th>CEP</th>
                                    <th>Rua</th>
                                    <th>Numero</th>
                                    <th>Compl.</th>
                                    <th>Bairro</th>
                                    <th>Cidade</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody align="center">
                                {this.state.addresses.map(addresses =>
                                    <tr key={addresses.id}>
                                        <td>
                                            {addresses.cep}
                                        </td>
                                        <td>
                                            {addresses.street}
                                        </td>
                                        <td>
                                            {addresses.number}
                                        </td>
                                        <td>
                                            {addresses.complement}
                                        </td>
                                        <td>
                                            {addresses.district}
                                        </td>
                                        <td>
                                            {addresses.citie}
                                        </td>
                                        <td>
                                            {addresses.uf}
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </Container>
                ) : (
                        <Container className="text-center">
                            <span className="h2">Nenhum endereço cadastrado!</span>
                            <div className="text-align-center" align="center">
                                <br/>
                                <Link to="/registeradress"><Button to="/registeradress" className="btn btn-success mr-3" > Cadastrar </Button></Link>
                            </div>
                        </Container >
                    )
                }

                <div className="fixed-bottom footer">
                    <Footer />
                </div>
            </>
        )
    }

}
export default Address;