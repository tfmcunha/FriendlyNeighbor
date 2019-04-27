import React, { Component } from 'react';

class RequestsList extends Component {
	render() {
		return(
			<div>
				<div>Requests</div>
		      		{this.props.requests !== undefined &&
		      			this.props.requests.map(request => {
			      			if (request.user_id !== this.props.user_id) {
			      				return <div onClick={(e) => this.props.handleRequest(request)}>{request.title}</div>
			      			} 
		      		})} 
			</div>
		);
	}
}

export default RequestsList;