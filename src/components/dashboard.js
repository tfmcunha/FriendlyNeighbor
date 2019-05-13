import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Row, Col, Modal } from 'react-bootstrap';
import Auth from '../modules/auth';
import Menu from './menu';
import RequestMap from './map';
import RequestsList from './requestslist';
import RequestDetail from './requestdetail';
import Request from './request';
import Profile from './profile';
import NewRequest from './newrequest';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			requests: [],
			currentRequest: {},	
			newLocation: {},
			show: false
		}
		this.handleLogout = this.handleLogout.bind(this);
		this.handleRequest = this.handleRequest.bind(this);
		this.findRequest = this.findRequest.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
	}

	componentWillMount() {   
		this.fetchProfile();
		this.fetchRequests();
		this.getLocation(); 
	}




	fetchProfile() {
		fetch('http://localhost:3001/profile', { 
			method: 'GET',
			headers: {	        
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`
			}
		})
		.then(res => res.json())
		.then(json => {
			if (json.user !== undefined ) {
				this.setState({
					user: json.user
				});
			} else {
				Auth.deauthenticateUser();
				const { handleAuth } = this.props;  
				handleAuth(); 
			}
		})	
	}

	fetchRequests() {
		fetch('http://localhost:3001/requests', { 
			method: 'GET',
			headers: {	        
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`
			}
		})
		.then(res => res.json())
		.then(json => {
			this.setState({
				requests: json.requests
			})				
		})			
	}

	getLocation() {
		if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }        
	}

	handleLogout() {
		Auth.deauthenticateUser();
	}

	handleRequest(request) {
		this.setState({
			currentRequest:request
		})
	}

	findRequest(request_id) {
		console.log('current',Object.keys(this.state.requests));
		console.log(this.state.requests);
		this.setState({
			currentRequest:this.state.requests[request_id]
		})
	}

	handleShow(lat, lng) {
		const coords = {lat: lat, lng: lng}
		this.setState({ 
			show: true,
			newLocation: coords 

		});
	}

	handleClose() {
		this.setState({show:false})
	}

	render() {					
		return (
			<Fragment>
				{!(Auth.isUserAuthenticated()) &&
					<Redirect to="/" />
				}

				<Menu user={this.state.user} handleLogout={this.handleLogout}/>     

				<Route 
				exact path="/dashboard" 
					render={() => 
						<Fragment>
							<Row>
								<Col md={9}>
									<div style={{height:"500px"}}>
										<RequestMap currentLocation={this.state.currentLocation} handleShow={this.handleShow} requests={this.state.requests}/>
									</div>
								</Col>
								<Col md={3}>
									<RequestsList requests={this.state.requests} handleRequest={this.handleRequest} />
								</Col>
							</Row>
							<Row>
								<Col>
									<RequestDetail request={this.state.currentRequest} />    
								</Col>
							</Row>
						</Fragment>
					} 
				/> 

				<Route 
					exact path={`/dashboard/request/${this.state.currentRequest.id}`}
					render={() => 					
						<Request request={this.state.currentRequest} />      					      				
					}
				/>   

				<Route 
					exact path="/dashboard/profile"
					render={() => 					
						<Profile user={this.state.user} handleRequest={this.handleRequest} findRequest={this.findRequest} />      					      				
					}
				/>   

				<Modal size="lg" show={this.state.show} onHide={this.handleClose}> 
					<NewRequest user_id={this.state.user.id} newLocation={this.state.newLocation} close={this.handleClose} />
				</Modal>


			</Fragment>
		);
	}
}

export default Dashboard;
