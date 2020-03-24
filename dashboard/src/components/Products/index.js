import React, { Component } from 'react';
import axios from 'axios';

import Header from '../Header';
import { Container, Button, Table, FormGroup, Input } from 'reactstrap';

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            displayProducts: []
        }
        if (!sessionStorage.getItem('user')) {
            this.props.history.push("/");
            return;
        }
        this.existentUser();
        this.getProducts();
    }

    existentUser = async () => {
        try {
            let { username } = JSON.parse(sessionStorage.getItem('user'));
            let user = await axios("http://localhost:9090/employee/find/" + username).catch(e => undefined);
            if (!user) {
                sessionStorage.removeItem('user');
                this.props.history.push("/");
            }
        } catch{
            this.props.history.push("/");
            sessionStorage.removeItem('user');
        }
    }

    getProducts = async () => {
        let { data: products } = await axios("http://localhost:8080/ecommerce/product/all");
        console.log(products);
        if (!products)
            return;
        this.setState({
            products,
            displayProducts: products
        });
    }

    filter = str => {
        let displayProducts = this.state.products.filter(x => x.name.toUpperCase().includes(str.toUpperCase()));
        this.setState({ displayProducts });
    }

    render() {
        return (
            <>
                <Header />
                {this.state.displayProducts.length <= 0 ? (<Container className="text-center mt-5">
                    <h2>Nenhum produto encontrado</h2>
                </Container>) : (

                        <Container className="text-center mt-5">
                            <h2>Produtos cadastrados</h2>
                            <FormGroup>
                                <Input type="text" name="filter" id="filter" onChange={e => this.filter(e.target.value)} />
                            </FormGroup>
                            <Table bordered className="table table-striped" style={{ marginTop: 20 }} >
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nome</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.displayProducts.map(p => (
                                        <tr key={p.id}>
                                            <td>
                                                {p.id}
                                            </td>
                                            <td>
                                                {p.name}
                                            </td>
                                            <td>
                                                <Button type="button" onClick={e => this.props.history.push('/edit/' + p.id)}>Editar</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Container>

                    )}
            </>
        )
    }
}
