import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



export default class Contato extends Component {

    constructor(props) {
        super(props);
        this.state = {
          username: '',
          age: null,
        };
      }

      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        if (nam === "age") {
          if (!Number(val)) {
            alert("Your age must be a number");
          }
        }
        this.setState({[nam]: val});
      }


  render() {
    return (
        <div className="contanier">
        <form>
        <h1>Hello {this.state.username} {this.state.age}</h1>
        <p>Enter your name:</p>
        <input
          type='text'
          name='username'
          onChange={this.myChangeHandler}
        />
        <p>Enter your age:</p>
        <input
          type='text'
          name='age'
          onChange={this.myChangeHandler}
        />
        </form>
        </div>
      );
   }
}
