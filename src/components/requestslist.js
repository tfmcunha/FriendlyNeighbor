import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

class RequestsList extends Component {		
	render() {		
		return(
			<div className="p-3 detailbox text-center">
				<h3>Requests</h3>
					<ListGroup>
		      		{this.props.requests !== undefined &&
		      			this.props.requests.length !== 0 ?
			      			this.props.requests.map(request => 
			      				<ListGroup.Item className="text-truncate" action key={request.id} onClick={(e) => this.props.handleRequest(request.id)}>{request.title}</ListGroup.Item>			      			 
			    	  		) 
			    	  		: <h6>No requests available in this area. <br />Drag map to find</h6>
		    	  	}
		      		</ListGroup>
			</div>
		);
	}
}

export default RequestsList;