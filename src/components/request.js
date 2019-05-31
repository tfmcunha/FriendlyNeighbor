import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import Auth from '../modules/auth';
import { ActionCableProvider } from 'react-actioncable-provider';
import Chat from './chat';

class Request extends Component {
	constructor() {
		super();
		this.state = {
			selected:"",
			fulfilled: false,
			conversationLoaded: false
		};
		this.handleFulfilled = this.handleFulfilled.bind(this);
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
		.then(json => {console.log("done")})
	}

	render() {	
		const request = this.props.request;	
		return(
			<Row className="my-3">
				{request.id === undefined && <Redirect to="/dashboard" />}
				<Col md={6}>
					<div>Details:</div>
					<ListGroup variant="flush">
						<ListGroup.Item>{request.req}</ListGroup.Item>
						<ListGroup.Item>{request.title}</ListGroup.Item>
						<ListGroup.Item className="text-break">{request.body}</ListGroup.Item>
					
						<ListGroup.Item className="mx-auto">
							<Image src={`https://maps.googleapis.com/maps/api/staticmap?center=${request.lat},${request.lng}&zoom=17&size=400x200&maptype=roadmap&markers=color:blue%7C${request.lat},${request.lng}&key=AIzaSyBqkhorIWv6NGUw4xhnxjKa6x6YWdffLzo`} fluid/>
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
					

					<div>
						<div>Volunteers:</div>
						{request.volunteers !== undefined &&
							request.volunteers.map(volunteer => (
							<div key={volunteer.id} onClick={(e) => this.selectVolunteer(volunteer.user_id)}>{volunteer.username}</div>
						))}								
					</div>
				</div>	
				}
				
					<ActionCableProvider url={`http://localhost:3001/cable?auth_token=${Auth.getToken()}`}>
						<Chat request_id={this.props.request.id} selected={this.state.selected} conversationLoaded={this.state.conversationLoaded} sender_id={this.props.user_id} recipient_id={this.props.request.user_id}/>
					</ActionCableProvider>
				</Col>			
			</Row>
		);
	}
}

export default Request;