import React, { Component } from 'react';

import {
    NavLink
} from 'reactstrap';


export default class Header extends Component {
  render() {
    return (
        <>
            <NavLink className="navbar navbar-dark bg-dark">
                    <NavLink className="navbar-brand" href="#">Adicione um novo produto</NavLink>
            </NavLink>
        </>
    )
  }
}
