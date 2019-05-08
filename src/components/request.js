import React, { Component } from 'react';

class Request extends Component {
	render() {		
		return(
			<div>Details:
				{this.props.request !== undefined  
				? <div>{this.props.request.title}</div>
				: <div>No request selected</div>
				}
			</div>
		);
	}
}

export default Request;