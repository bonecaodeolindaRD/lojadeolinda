import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import api from '../../services/api';
import { Container, Table, Button } from 'reactstrap';
import './styles.css'
import { Link } from 'react-router-dom';

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            margin: 580
        }
 
    }
    
    componentDidMount(){
        if (!sessionStorage.getItem('client')) {
            this.props.history.push('/');
            return;
        }
        this.getAddresses();
    }

    getAddresses = async () => {
        const { email } = JSON.parse(sessionStorage.getItem('client'));
        try {
            let { data: add } = await api.get("/client/addresses/" + email);
            await this.setState({
                addresses: add.addresses
            })
            let margin = this.state.margin - this.state.orders.length * 80;
            if (margin <= 40)
                this.setState({ margin: 40 });
            else
                this.setState({ margin });
        } catch{
            this.setState({ margin: 580 });
        }
    }

    getAddresses(e) {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <Header history={this.props.history} location={this.props.location} />
                <Container className="align-center" style={{ marginBottom: this.state.margin }}>
                    {this.state.addresses ? (
                        <>
                            <h3 align="center">Meus Endereços</h3>
                            <div className="text-align-center" align="center">
                                <Link to="/registeraddress"><Button className="btn btn-success mr-3" > Cadastrar </Button></Link>
                            </div>
                            <Table bordered responsive className="table table-striped" style={{ marginTop: 20 }} >
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
                        </>
                    ) : (
                            <Container className="text-center">
                                <span className="h2">Nenhum endereço cadastrado!</span>
                                <div className="text-align-center" align="center">
                                    <br />
                                    <Link to="/registeraddress"><Button className="btn btn-success mr-3" > Cadastrar </Button></Link>
                                </div>
                            </Container >
                        )
                    }
                </Container>
                <Footer />
            </>
        )
    }

}
export default Address;