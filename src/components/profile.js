import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Auth from '../modules/auth';
import { Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { FaBackward } from "react-icons/fa";
import ErrorsHandler from './errorshandler';


class Profile extends Component {
	constructor() {
		super();
		this.state = {
			owned_requests: [],
			isVolunteer: [],
			user: {},
			govid: null,
			errors: {},
		}
		this.handleChange=this.handleChange.bind(this);	
		this.handleRegister=this.handleRegister.bind(this);	
		

	}

	componentWillMount() {
		fetch('http://localhost:3001/owner', { 
			method: 'GET',
			headers: {	        
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`			
			}	
		})
		.then(res => res.json())
		.then(json => {
			this.setState({
				owned_requests: json.requests,
				isVolunteer: json.isVolunteer
			});	
			console.log(json)		
		})

		
	}

	handleChange(e) {
		const user = this.state.user;
		user[e.target.name] = e.target.value;		
		this.setState({ 
			user
		});
	}	

	handleRegister(e) {
		fetch(`http://localhost:3001/users/${this.props.user.id}`,{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json', 	       
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`			
			},
			body: JSON.stringify(this.state.user)
		})
		.then(res => res.json())
		.then(json => {console.log(json)})	
	}

	

	render() {
		return (
			<Fragment>
				<Row>
					<Col>
						<div className="p-2"><h6><Link to="/dashboard"><FaBackward /> Dashboard</Link></h6></div>
					</Col>
				</Row>
				<Row>
					{!(Auth.isUserAuthenticated()) &&
						<Redirect to="/" />
					}

					<Col md={4}>
						<div className="mt-2">
							<h3 className="text-center">Edit your details</h3>
							<Form onSubmit={this.handleRegister}>		      		
								<Form.Group>
									<Form.Label>E-mail</Form.Label>
									<Form.Control type="email" defaultValue={this.props.user.email} disabled/>				
								</Form.Group> 

								<Form.Group>
									<Form.Label>First name</Form.Label>
									<Form.Control type="text" defaultValue={this.props.user.first_name} name="first_name" onChange={this.handleChange}/>
									<Form.Text className="text-danger">{this.state.errors.first_name}</Form.Text>
								</Form.Group> 

								<Form.Group>
									<Form.Label>Last name</Form.Label>
									<Form.Control type="text" name="last_name" defaultValue={this.props.user.last_name} onChange={this.handleChange}/>
									<Form.Text className="text-danger">{this.state.errors.last_name}</Form.Text>
								</Form.Group>   

								<Button variant="primary" type="submit">Save</Button>
							</Form>
						</div>
					</Col>

					<Col md={4}>
						<div className="mt-2">
							<h3 className="text-center">I need help:</h3>
							<ListGroup variant="flush" className="text-center">
							{this.state.owned_requests !== undefined &&
								this.state.owned_requests.map(request => (
								<ListGroup.Item key={request.id}><Link to={"/dashboard/request"} onClick={(e) => this.props.handleOwnRequest(request)}>{request.title}</Link></ListGroup.Item>
							))}
							</ListGroup>
						</div>
					</Col>

					<Col md={4}>
						<div className="mt-2">
							<h3 className="text-center">Im helping:</h3>
							<ListGroup variant="flush" className="text-center">
							{this.state.isVolunteer !== undefined &&
								this.state.isVolunteer.map(request => (							
								<ListGroup.Item key={request.id}><Link to={"/dashboard/request"} onClick={(e) => this.props.handleOwnRequest(request)} >{request.title}</Link></ListGroup.Item>
							))}
							</ListGroup>
						</div>
					</Col>

				</Row>
			</Fragment>
		);
	}
}

export default Profile;