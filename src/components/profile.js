import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Auth from '../modules/auth';
import { Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import ErrorsHandler from './errorshandler';


class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			govid: null,
			errors: {},
		}
		this.handleChange=this.handleChange.bind(this);	
		this.handleRegister=this.handleRegister.bind(this);	
		this.handleFile=this.handleFile.bind(this); 

	}

	componentDidMount() {		
		const user = this.props.user;
		this.setState({
			user: {
				"first_name": user.first_name,
				"last_name": user.last_name
			}
		})
	}

	handleChange(e) {
		const user = this.state.user;
		user[e.target.name] = e.target.value;		
		this.setState({ 
			user
		});
	}	

	handleFile(e) {    
		const govid = e.target.files[0];
		this.setState({ 
			govid
		}); 
	}  

	validateForm() {
		const user = this.state.user;		
		let errors ={};
		let formIsValid = true;

		if (!user["first_name"]) {
			formIsValid = false;
			errors["first_name"] = "*Enter your first name!";
		}

		if (!user["last_name"]) {
			formIsValid = false;
			errors["last_name"] = "*Enter your last name!";
		} 

		this.setState({
			errors
		})

		return formIsValid;

	}

	handleRegister(e) {
		e.preventDefault();	
		console.log(this.state.user)	
	}

	

	render() {
		console.log(this.props.user)
		return (
			<Row>
				{!(Auth.isUserAuthenticated()) &&
					<Redirect to="/" />
				}
				<Col md={4}>
					<h2 className="text-center">Edit your details</h2>
					<Form onSubmit={this.handleRegister}>		      		
						<Form.Group>
							<Form.Label>E-mail</Form.Label>
							<Form.Control type="email" value={this.props.user.email} disabled/>				
						</Form.Group> 

						<Form.Group>
							<Form.Label>First name</Form.Label>
							<Form.Control type="text" name="first_name" value={this.state.user.first_name} onChange={this.handleChange}/>
							<Form.Text className="text-danger">{this.state.errors.first_name}</Form.Text>
						</Form.Group> 

						<Form.Group>
							<Form.Label>Last name</Form.Label>
							<Form.Control type="text" name="last_name" value={this.state.user.last_name} onChange={this.handleChange}/>
							<Form.Text className="text-danger">{this.state.errors.last_name}</Form.Text>
						</Form.Group> 

						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" name="password" placeholder="Leave blank if unchanged" value={this.state.user.password} onChange={this.handleChange}/>		      		
							
						</Form.Group>     

						

						<Button variant="primary" type="submit">Save</Button>
					</Form>
				</Col>

				<Col md={4}>
					<h2 className="text-center">I need help:</h2>
					<ListGroup>
					{this.props.user.requests !== undefined &&
						this.props.user.requests.map(request => (
						<ListGroup.Item><Link to={`/dashboard/request/${request.id}`} onClick={(e) => this.props.handleRequest(request)}>{request.title}</Link></ListGroup.Item>
					))}
					</ListGroup>
				</Col>

				<Col md={4}>
					<h2 className="text-center">Im helping:</h2>
					<ListGroup>
					{this.props.user.volunteers !== undefined &&
						this.props.user.volunteers.map(volunteer => (							
						<ListGroup.Item><Link to={`/dashboard/request/${volunteer.request_id}`} onClick={(e) => this.props.findRequest(volunteer.request_id)} >{volunteer.request_id}</Link></ListGroup.Item>
					))}
					</ListGroup>
				</Col>

			</Row>
		);
	}
}

export default Profile;