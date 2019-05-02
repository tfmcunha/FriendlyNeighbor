import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Auth from '../modules/auth';
import CancelAcc from './cancelacc';
import NewRequest from './newrequest';



class Menu extends Component {
	constructor() {
		super();
	    this.state = { show: false};
	    this.handleShow=this.handleShow.bind(this); 
	    this.handleClose=this.handleClose.bind(this); 		
	}

	handleLogout() {
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
     		<div>
	      		Hello {this.props.user.first_name}
	      		<a href={this.props.user.govid}>View file</a>
	      		<a href="/" onClick={this.props.handleLogout}>Logout</a>      	
	      		<CancelAcc user_id={this.props.user.id} />

	      		<Button variant="primary" onClick={this.handleShow}>
					New Request
				</Button>

				<Modal size="lg" show={this.state.show} onHide={this.handleClose}>
					<NewRequest user_id={this.props.user.id}/>
				</Modal>
      		</div>
    	);
  	}
}

export default Menu;
