import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Help extends Component {
	render() {
		return(
			<div className="p-5 d-flex justify-content-center">
				<div>
					<div className="text-center"><a href="/" className="brand">Friendly Neighbour</a></div>
					<h3>Add Requests</h3>
						<ul>
							<li>Login or create a new account</li>
							<li>Click on a location of the map to add a new help request</li>
							<li>The map will not show your own requests but you can check them in your Profile</li>
							<li>Choose a request to manage</li>
							<li>A list of volunteers will appear. Click a volunteer to start a chat or delete it</li>
							<li>When the request gets 5 volunteers, the request will no longer appear on the map</li>							
							<li>Whenever you believe that the request was fulfilled, check "Request Fulfilled?" status</li>
							<li>If not fulfilled after 24hours of the 5th volunteer, the request will be displayed again on the map</li>
						</ul>
					<h3>Help on a Request</h3>
						<ul>
							<li>Login or create a new account</li>
							<li>If no requests are displayed, drag map to find them</li>
							<li>Select request by clicking the marker on the map or on the list next to the map</li>
							<li>See the details for the request and click "Help"</li>
							<li>On the request page, send message to the user to discuss help terms</li>
							<li>Manage the requests you are helping in your Profile</li>							
							<li>Whenever you believe that the request was fulfilled, check "Request Fulfilled?" status</li>
							<li>If a request that you were helping no longer appear, means that either was fulfilled or the user deleted your help offer</li>
						</ul>
					<Link to="/">BACK</Link>
				</div>				
			</div>
		);
	}
}

export default Help;