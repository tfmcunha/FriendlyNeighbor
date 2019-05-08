import React, { Component } from 'react';
import './teste.css';

class RequestsList extends Component {	
	render() {
		return(
			<div>
				<div>Requests</div>
		      		{this.props.requests !== undefined &&

		      			this.props.requests.map(request => {

			      				return <div key={request.id} onClick={(e) => this.props.handleRequest(request)}>{request.title}</div>
			      			 
		      		})} 
			</div>
		);
	}
}

export default RequestsList;