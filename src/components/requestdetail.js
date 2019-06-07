import React, { Component, Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaUserAlt, FaTasks, FaInfo, FaExclamation } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../css/requestdetail.css';

class RequestDetails extends Component {
	render() {		
		const request = this.props.request
		return(
			<Fragment>
				<h4>Details:</h4>
				{request.id !== undefined  
				? 	<Row className="detailbox">
						<Col md={3}>
							<div><FaUserAlt /> {request.user_name}</div>							
							<div><FaExclamation /> {request.req_type}</div>
						</Col>
						<Col md={8}>
							<div><FaInfo /> {request.title}</div>
							<div className="text-break"><FaTasks/> {request.body}</div>
						</Col>
						<Col md={1}>
							<Link to={"/dashboard/request"}><Button className="mt-2">HELP</Button></Link>
						</Col>
					</Row>
				: <div>No request selected</div>
				}
			</Fragment>
		);
	}
}

export default RequestDetails;