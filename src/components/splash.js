import React, { Component } from 'react';
import { Row, Col, Button, Modal, Image } from 'react-bootstrap';
import Count from './count';
import LoginForm from './loginform';
import Register from './register';
import '../css/splash.css';

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
			<div className="cover">				
				<Row>
					<Col lg={6} className="d-none d-lg-block">
						<div className="d-flex justify-content-center align-items-center vh-100">
							<div className="m-5 box">
								<h1 className="display-4 p-4 text-center">
									JOIN YOUR NEIGHBOURS IN A NETWORK OF MUTUAL AID!
								</h1>
								
								<Count />
								
							</div>
						</div>
					</Col>
					<Col lg={6}>
						<div className="d-flex justify-content-center align-items-center vh-100">
							<div className="p-2 box">
								<div className="m-2 brand text-center"> Friendly Neighbour </div>
								<Image className="d-block" src ="./handyman.png" fluid/>
								<div className="d-flex justify-content-center">
									<Button variant="primary" className="m-2" onClick={this.handleShowLogin}>
										Login
									</Button>

									<Button variant="primary" className="m-2" onClick={this.handleShowRegister}>
										Register
									</Button>
								</div>
								<Modal size="sm" show={this.state.showLogin} onHide={this.handleCloseLogin}>
									<LoginForm />					
								</Modal>

								<Modal size="lg" show={this.state.showRegister} onHide={this.handleCloseRegister}>
									<Register />
								</Modal>

							</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Splash;
