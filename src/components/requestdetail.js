import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class RequestDetails extends Component {

	createNewConversation = () => {
		const sender_id = this.props.user_id;
		const receiver_id = this.props.request.user.id;
		
	}
	render() {		
		const request = this.props.request
		return(
			<div>Details:
				{request.id !== undefined  
				? 	<div>
						<div>{request.title}</div>
						<div className="text-break">{request.body}</div>
						<Link to={"/dashboard/request"} onClick={this.createNewConversation}><Button>HELP</Button></Link>
					</div>
				: <div>No request selected</div>
				}
			</div>
		);
	}
}

export default RequestDetails;