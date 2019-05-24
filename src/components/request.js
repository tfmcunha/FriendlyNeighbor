import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {Row, Col, Image } from 'react-bootstrap';
import Auth from '../modules/auth';
import { ActionCableProvider } from 'react-actioncable-provider';
import Chat from './chat';

class Request extends Component {
	render() {	
		const request = this.props.request;	
		console.log("req", request)	
		return(
			<Row>
				{request.id === undefined && <Redirect to="/dashboard" />}
				<Col md={6}>
					<div>Details:</div>
					<div>{request.title}</div>
				</Col>
				 
				
				<Col md={6}>
					<div>
						<Image src={`https://maps.googleapis.com/maps/api/staticmap?center=${request.lat},${request.lng}&zoom=18&size=700x300&maptype=roadmap&markers=color:blue%7C${request.lat},${request.lng}&key=AIzaSyBqkhorIWv6NGUw4xhnxjKa6x6YWdffLzo`} fluid/>
					</div>
				</Col>	
				{this.props.user_id === request.user_id &&
				<Col md={6}>
					<div>Volunteers:</div>
					{request.volunteers.map(volunteer => (
						<div>{volunteer.username}</div>
					))}
					

				</Col>
				}
				<Col md={6}>
					<ActionCableProvider url={`http://localhost:3001/cable?auth_token=${Auth.getToken()}`}>
						<Chat request_id={this.props.request.id} sender_id={this.props.user_id} recipient_id={this.props.request.user_id}/>
					</ActionCableProvider>
				</Col>			
			</Row>
		);
	}
}

export default Request;