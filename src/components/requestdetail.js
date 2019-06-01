import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class RequestDetails extends Component {
	render() {		
		const request = this.props.request
		return(
			<Fragment>
				<h4>Details:</h4>
				{request.id !== undefined  
				? 	<div>
						<div>{request.title}</div>
						<div className="text-break">{request.body}</div>
						<Link to={"/dashboard/request"} ><Button>HELP</Button></Link>
					</div>
				: <div>No request selected</div>
				}
			</Fragment>
		);
	}
}

export default RequestDetails;