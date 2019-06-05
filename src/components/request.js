import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { FaUserAlt, FaTasks, FaInfo, FaExclamation } from "react-icons/fa";
import {Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import Auth from '../modules/auth';
import Chat from './chat';
import '../css/request.css';

class Request extends Component {
	constructor() {
		super();
		this.state = {
			selected:"",
			fulfilled: false,
			redirect: false,
		};
		this.handleFulfilled = this.handleFulfilled.bind(this);
		this.deleteVolunteer = this.deleteVolunteer.bind(this);
	}

	componentWillMount() {
		if (this.props.user_id !== this.props.request.user_id) {
			const volunteer = {};
			volunteer["request_id"] = this.props.request.id;
			volunteer["user_id"] = this.props.user_id;
			fetch("http://localhost:3001/volunteers",{
				method: 'post',
				headers: {	
					'Content-Type':	'application/json',		
					token: Auth.getToken(),
					'Authorization': `Token ${Auth.getToken()}`			
				},
				body: JSON.stringify(volunteer)
			})
			.then(res => res.json())
			.then(json => {console.log("ok")})
		}
	}

	selectVolunteer = (id) => {
		this.setState({selected:id})
	}

	handleFulfilled(e) {
		const status = {};
		status["fulfilled"] = true;		
		e.preventDefault();
		fetch(`http://localhost:3001/requests/${this.props.request.id}`,{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json', 	       
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`			
			},
			body: JSON.stringify(status)
		})
		.then(res => res.json())
		.then(json => {this.setState({redirect: true})})
	}

	deleteVolunteer(id) {
		fetch(`http://localhost:3001/volunteers/${id}`,{
			method: 'delete',
			headers: {				
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`			
			},
		})
		.then(res => res.json())
		.then(json => {this.setState({redirect: true})})
	}

	render() {	

		const request = this.props.request;	
		return(
			<Row className="my-3">
				{(request.id === undefined || this.state.redirect) && <Redirect to="/" />}
				<Col md={6}>
					<h4>Details:</h4>
					<ListGroup variant="flush">
						<ListGroup.Item><FaUserAlt /> {request.user_name}</ListGroup.Item>
						<ListGroup.Item><FaExclamation /> {request.req_type} </ListGroup.Item>
						<ListGroup.Item><FaInfo /> {request.title}</ListGroup.Item>
						<ListGroup.Item className="text-break"><FaTasks /> {request.body}</ListGroup.Item>
					
						<ListGroup.Item className="mx-auto">
							<Image src={`https://maps.googleapis.com/maps/api/staticmap?center=${request.lat},${request.lng}&zoom=17&size=400x200&maptype=roadmap&markers=color:blue%7C${request.lat},${request.lng}&key=${process.env.REACT_APP_GM_API_KEY}`} fluid/>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={6}> 
					<div>
						Is the request fulfilled?
						<Button variant="success" type="button" onClick={this.handleFulfilled}>CONFIRM</Button> 
					</div>
				{this.props.user_id === request.user_id &&
				<div>					

					<ListGroup>
						<h4>Volunteers:</h4>
						{request.volunteers !== undefined &&
							request.volunteers.map(volunteer => (
							<Row key={volunteer.id} >
								<Col xs={8}><ListGroup.Item className="py-1 text-center" action onClick={(e) => this.selectVolunteer(volunteer.user_id)}>{volunteer.username}</ListGroup.Item></Col>
								<Col xs={4}><Button variant="danger" size="sm" onClick={(e) => this.deleteVolunteer(volunteer.id)}><MdDeleteForever className="delete"/></Button></Col> 
							</Row>
						))}								
					</ListGroup>
				</div>	
				}		
					<Chat request_id={this.props.request.id} selected={this.state.selected} sender_id={this.props.user_id} recipient_id={this.props.request.user_id}/>
				
				</Col>			
			</Row>
		);
	}
}

export default Request;