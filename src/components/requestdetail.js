import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RequestDetails extends Component {

	createNewConversation = () => {
		const sender_id = this.props.user_id;
		const receiver_id = this.props.request.user.id;
		
	}
	render() {		
		return(
			<div>Details:
				{this.props.request.id !== undefined  
				? 	<div>
						<div>{this.props.request.body}</div>
						<Link to={"/dashboard/request"} onClick={this.createNewConversation}>HELP</Link>
					</div>
				: <div>No request selected</div>
				}
			</div>
		);
	}
}

export default RequestDetails;