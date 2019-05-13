import React, { Component, Fragment } from 'react';
import {Row, Col, Image } from 'react-bootstrap';

class Request extends Component {
	render() {	
		const request = this.props.request;	
		return(
			<Row>
				<Col md={6}>
					<div>Details:</div>
				</Col>
				 
				
				<Col md={6}>
					<div>
						<Image src={`https://maps.googleapis.com/maps/api/staticmap?center=${request.lat},${request.lng}&zoom=13&size=700x300&maptype=roadmap&markers=color:blue%7C${request.lat},${request.lng}&key=AIzaSyBqkhorIWv6NGUw4xhnxjKa6x6YWdffLzo`} fluid/>
					</div>
				</Col>				
			</Row>
		);
	}
}

export default Request;