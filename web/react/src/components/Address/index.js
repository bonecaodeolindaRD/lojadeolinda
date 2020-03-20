import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';
import { Container, Table } from 'reactstrap';
import './styles.css'

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
                            <span className="h2">Nenhum endereço encontrado!</span>
                        </Container >
                    )
                }

                <div className="footer">
                    <Footer />
                </div>
            </>
        )
    }

}
export default Address;