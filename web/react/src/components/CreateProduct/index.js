import React, { Component } from 'react';
import {
    Nav,
    Container,
    Col,
    Row,
    Button,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    NavLink
} from 'reactstrap';

// import { Container } from './styles';




export default class CreateProduct extends Component {


    // constructor() {
    //     super();
    //     this.state = {
    //         name: '',
    //         description: '',
    //         price: '',
    //         nameError: false,
    //         descriptionError: false,
    //         priceError: false,
    //         isOpen: false
    //     };
    // }

    constructor(props) {
        super(props);
        this.state = {
            title: 'React Simple CRUD Application',
            act: 0,
            index: '',
            datas: []
        }
    }

    componentDidMount(){
        this.refs.name.focus();
      }
    
      fSubmit = (e) =>{
        e.preventDefault();
        console.log('try');
    
        let datas = this.state.datas;
        let name = this.refs.name.value;
        let address = this.refs.address.value;
    
        if(this.state.act === 0){   //new
          let data = {
            name, address
          }
          datas.push(data);
        }else{                      //update
          let index = this.state.index;
          datas[index].name = name;
          datas[index].address = address;
        }    
    
        this.setState({
          datas: datas,
          act: 0
        });
    
        this.refs.myForm.reset();
        this.refs.name.focus();
      }
    
      fRemove = (i) => {
        let datas = this.state.datas;
        datas.splice(i,1);
        this.setState({
          datas: datas
        });
    
        this.refs.myForm.reset();
        this.refs.name.focus();
      }
    
      fEdit = (i) => {
        let data = this.state.datas[i];
        this.refs.name.value = data.name;
        this.refs.address.value = data.address;
    
        this.setState({
          act: 1,
          index: i
        });
    
        this.refs.name.focus();
      }  



    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };


    mySubmitHandler = (event) => {

        event.preventDefault();

        let { name, description, price } = this.state;

        if (name.length <= 3) {
            this.setState({ nameError: true });
            return false;
        } else {
            this.setState({ nameError: false });
        }

        alert(name + "" + description + "" + price);

        this.toggleModal();

    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }

    render() {
        let datas = this.state.datas;
        return (
            <>
                <NavLink className="navbar navbar-dark bg-dark">
                    <NavLink className="navbar-brand" href="#">Adicione um novo produto</NavLink>
                </NavLink>
                <Container className="border border-primary rounded mt-5 p-4">
                    <Form className="App" >
                        <FormGroup className="bg-warning rounded  p-2">
                            <Label>Cadastro de Produdos</Label>
                        </FormGroup>
                        <Row form>
                            <Col md={8}>
                                <FormGroup ref="myForm" className="myForm">
                                    <Label for="name">Nome do Produto*</Label>
                                    <Input type="text"  ref="name" placeholder="Digite um novo produto" className="formField" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Descrição do produto*</Label>
                                    <Input type="textarea" ref="address" placeholder="Digite uma descrição..." className="formField" />
                                </FormGroup>
                                <p>*Campos obrigatórios</p>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="categoriaProduto">Categoria*</Label>
                                    <Input type="select" name="categoria" id="categoriaProduto">
                                        <option>-</option>
                                        <option>Atletas</option>
                                        <option>Jornalistas</option>
                                        <option>Politicos</option>
                                        <option>Personalizados</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="imagemProduto">Imagem*</Label>
                                    <Input type="file" name="imagemProduto" id="imagemProduto" />
                                    <FormText color="muted">
                                        Insira a imagem do produto
                                </FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="price">Preço:*</Label>
                                    <Input type="text" name="price" id="price" placeholder="Digite o valor do produto" className={`form-control ${this.state.priceError ? 'is-invalid' : null}`} onChange={this.myChangeHandler} required />
                                </FormGroup>
                                <Button color="primary" 
                                outline type="submit" 
                                value="Enviar" onClick={(e) => this.fSubmit(e)} className="myButton"
                                onClick={this.mySubmitHandler}  >
                                    Adicionar
                                </Button>

                            </Col>
                        </Row>
                    </Form>

                </Container>

                <Modal isOpen={this.state.isOpen} >
                    <ModalHeader toggle={this.toggleModal}>Pronto!</ModalHeader>
                    <ModalBody>
                        Um novo produto foi adicionado.
                     </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={this.toggleModal}>OK</Button>
                    </ModalFooter>
                </Modal>

                <div className="App">
                    
                    <form ref="myForm" className="myForm">
                        <input type="text" ref="name" placeholder="" className="formField" />
                        <input type="text" ref="address" placeholder="your address" className="formField" />
                        <button onClick={(e) => this.fSubmit(e)} className="myButton">submit </button>
                    </form>
                    <pre>
                        {datas.map((data, i) =>
                            <li key={i} className="myList">
                                {i + 1}. {data.name}, {data.address}
                                <button onClick={() => this.fRemove(i)} className="myListButton">remove </button>
                                <button onClick={() => this.fEdit(i)} className="myListButton">edit </button>
                            </li>
                        )}
                    </pre>
                </div>



            </>
        );
    }


}
