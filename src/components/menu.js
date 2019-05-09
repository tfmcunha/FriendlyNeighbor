import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import Auth from '../modules/auth';
import CancelAcc from './cancelacc';
import NewRequest from './newrequest';
import { GoPlus } from "react-icons/go";



class Menu extends Component {
	constructor() {
		super();
	    this.state = { show: false};
	    this.handleShow=this.handleShow.bind(this); 
	    this.handleClose=this.handleClose.bind(this); 		
	}

	handleLogout() {
		fetch('http://localhost:3001/logout', {
			method: 'delete',
			headers: {
				'Authorization': `Token ${Auth.getToken()}`
			}
		})
		.then(res => res.json())
		.then(json => console.log(json));
		Auth.deauthenticateUser();
	}


	handleShow() {
		this.setState({ show: true });
	}

	handleClose() {
		this.setState({ show: false });
	}

	render() {
    	return (    		
     		<Fragment>

	     		<Navbar bg="light" expand="lg">
		     		<Navbar.Brand href="/">Friendly Neighbour</Navbar.Brand>
		     		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		     		<Navbar.Collapse id="basic-navbar-nav">
			     		<Nav className="ml-auto">			     		
				     		
				     		<NavDropdown title={`Hello, ${this.props.user.first_name}`} id="basic-nav-dropdown">
				     		<NavDropdown.Item href="/dashboard/profile">Profile</NavDropdown.Item>
				     		<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
				     		<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
				     		<NavDropdown.Divider />
				     		<NavDropdown.Item href="/" onClick={this.handleLogout}>Logout</NavDropdown.Item>
				     		</NavDropdown>
			     		</Nav>
		     		</Navbar.Collapse>
	     		</Navbar>

				<Modal size="lg" show={this.state.show} onHide={this.handleClose}>
					<NewRequest user_id={this.props.user.id} close={this.handleClose} />
				</Modal>

      		</Fragment>
    	);
  	}
}

export default Menu;
