import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Auth from '../modules/auth';
import Menu from './menu';
import RequestMap from './map';
import RequestsList from './requestslist';
import RequestDetail from './requestdetail';
import Request from './request';
import Profile from './profile';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			requests: [],
			currentRequest: {},	
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

	handleShow() {
		this.setState({ show: true });
	}

	handleClose() {
		this.setState({ show: false });
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
									<RequestMap />
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

			</Fragment>
		);
	}
}

export default Dashboard;
