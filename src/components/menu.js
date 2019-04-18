import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Menu extends Component {
  render() {
    return (
      <div>
      	<Link exact to="/login">Login</Link>
      </div>
    );
  }
}

export default Menu;
