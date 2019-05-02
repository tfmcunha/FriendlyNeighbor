import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoginForm from './loginform';
import Register from './register';

class Splash extends Component {
	constructor() {
		super();

		this.handleShowLogin = this.handleShowLogin.bind(this);
		this.handleCloseLogin = this.handleCloseLogin.bind(this);
		this.handleShowRegister = this.handleShowRegister.bind(this);
		this.handleCloseRegister = this.handleCloseRegister.bind(this);

		this.state = {
			showLogin: false,
		};
	}

	handleCloseLogin() {
		this.setState({ showLogin: false });
	}

	handleShowLogin() {
		this.setState({ showLogin: true });
	}

	handleCloseRegister() {
		this.setState({ showRegister: false });
	}

	handleShowRegister() {
		this.setState({ showRegister: true });
	}

	render() {
		return (
			<div>
				
				<Button variant="primary" onClick={this.handleShowLogin}>
					Login
				</Button>

				<Button variant="primary" onClick={this.handleShowRegister}>
					Register
				</Button>

				<Modal size="sm" show={this.state.showLogin} onHide={this.handleCloseLogin}>
					<LoginForm />					
				</Modal>

				<Modal size="lg" show={this.state.showRegister} onHide={this.handleCloseRegister}>
					<Register />
				</Modal>

			</div>
			);
	}
}

export default Splash;
