import React, { Component } from 'react';
import Auth from '../modules/auth';
import CancelAcc from './cancelacc';


class Menu extends Component {

	handleLogout() {
	  	Auth.deauthenticateUser();
	}

	render() {
    	return (
     		<div>
	      		Hello {this.props.user.first_name}
	      		<a href={this.props.user.govid}>View file</a>
	      		<a href="/" onClick={this.props.handleLogout}>Logout</a>
	      		
      	
      		</div>
    	);
  	}
}

export default Menu;
