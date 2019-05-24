import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import './teste.css';

class RequestsList extends Component {		
	render() {
		return(
			<div className="p-3">
				<h3>Requests</h3>
					<ListGroup>
		      		{this.props.requests !== undefined &&

		      			this.props.requests.map(request => {

			      				return <ListGroup.Item action key={request.id} onClick={(e) => this.props.handleRequest(request.id)}>{request.title}</ListGroup.Item>
			      			 
		      		})} 
		      		</ListGroup>
			</div>
		);
	}
}

export default RequestsList;