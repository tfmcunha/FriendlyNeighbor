import React, { Component } from 'react';

class RequestDetails extends Component {
	render() {
		console.log(this.props.request)
		return(
			<div>Details:
				{this.props.request !== undefined  
				? <div>{this.props.request.body}</div>
				: <div>No request selected</div>
				}
			</div>
		);
	}
}

export default RequestDetails;