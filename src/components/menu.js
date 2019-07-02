import React, { Component, Fragment } from 'react';
import { API_ROOT } from '../constants';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Auth from '../modules/auth';
import '../css/menu.css';

class Menu extends Component {
	
	handleLogout = (e) => {
		fetch(`${API_ROOT}/logout`, {
			method: 'delete',
			headers: {
				'Authorization': `Token ${Auth.getToken()}`
			}
		})
		.then(res => res.json())
		.then(json => console.log(json));
		Auth.deauthenticateUser();
	}

	render() {
    	return (    		
     		<Fragment>

	     		<Navbar bg="light" expand="sm" className="menu" >
		     		<Navbar.Brand className="brand p-2" href="/">Friendly Neighbour</Navbar.Brand>		     		
		     		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		     		<Navbar.Collapse id="basic-navbar-nav">
			     		<Nav className="ml-auto">				     		
				     		<NavDropdown title={`Hello, ${this.props.user.first_name}`} id="basic-nav-dropdown">
					     		<NavDropdown.Item href="/dashboard/profile">Profile</NavDropdown.Item>
					     		<NavDropdown.Divider />
					     		<NavDropdown.Item href="/" onClick={this.handleLogout}>Logout</NavDropdown.Item>
				     		</NavDropdown>
			     		</Nav>
		     		</Navbar.Collapse>
	     		</Navbar>

      		</Fragment>
    	);
  	}
}

export default Menu;
