import React, { Component } from 'react';

import api from '../../services/api';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

import Header from '../Header';
import { Container, Button, Table, FormGroup, Input, InputGroup } from 'reactstrap';

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            displayProducts: [],
            page: 0,
            itemsPerPage: 10,
            totalPages: 1
        }
    }

    async componentDidMount() {
        if (!sessionStorage.getItem('user')) {
            this.props.history.push("/");
            return;
        }
        this.existentUser();
        this.getProducts(0);
        this.getTotalPages();
    }


    getTotalPages = async () => {
        try {
            let quantity = await api.get("/product/pages");
            let totalPages = Math.ceil(quantity.data / this.state.itemsPerPage) - 1;
            await this.setState({ totalPages });
        } catch{
            this.setState({ totalPages: 0 });
        }
    }

    existentUser = async () => {
        try {
            let { username } = JSON.parse(sessionStorage.getItem('user'));
            let user = await api.get("/employee/" + username);
            if (!user) {
                sessionStorage.removeItem('dG9rZW4=');
                sessionStorage.removeItem('user');
                this.props.history.push("/");
            }
        } catch{
            this.props.history.push("/");
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('dG9rZW4=');
        }
    }

    nextPage = async () => {
        if (this.state.page >= this.state.totalPages)
            return;
        let page = this.state.page + 1;
        await this.setState({ page });
        await this.getProducts(this.state.page);
        while (this.state.products <= 0) {
            await this.setState({ page: this.state.page - 1 });
            await this.getProducts(this.state.page);
        }
    }

    previousPage = async () => {
        if (this.state.page <= 0)
            return;
        let page = this.state.page - 1;
        await this.setState({ page });
        await this.getProducts(this.state.page);
        while (this.state.products <= 0) {
            this.setState({ page: this.state.page + 1 });
            await this.getProducts(this.state.page);
        }
    }

    getProducts = async (page) => {
        try {
            let { data: products } = await api.get("/product/pages/" + page + "?items=" + this.state.itemsPerPage);
            if (!products) {
                return;
            }


            products.forEach(async p => {
                let { data } = await api.get("/stock/product/" + p.id + "/1");
                let {balance } = data;
                let item = products.find(i => i.id === p.id);
                item.balance = balance;
            })

            await this.setState({
                products
            });

            setTimeout(e => this.setState({ displayProducts: this.state.products}), 500);


        } catch{
            this.setState({ products: [] });
        }
    }

    filter = str => {
        let displayProducts = this.state.products.filter(x => x.name.toUpperCase().includes(str.toUpperCase()));
        this.setState({ displayProducts });
    }

    render() {
        return (
            <>
                <Header />
                {this.state.products.length <= 0 ? (<Container className="text-center mt-5">
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
                                        <th>Em estoque</th>
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
                                                {p.balance}
                                            </td>
                                            <td>
                                                <Button type="button" onClick={e => this.props.history.push('/edit/' + p.id)}>Editar</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <InputGroup className="text-center">
                                <Button type="button" onClick={this.previousPage}><MdNavigateBefore /></Button>
                                <h4>Pagina: {this.state.page + 1}</h4>
                                <Button type="button" onClick={this.nextPage}><MdNavigateNext /></Button>
                            </InputGroup>
                        </Container>

                    )}
            </>
        )
    }
}
