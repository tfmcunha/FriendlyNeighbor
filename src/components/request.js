import React, { Component, Fragment } from 'react';
import { API_ROOT, API_WS_ROOT } from '../constants';
import { Redirect, Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { FaBackward, FaUserAlt, FaTasks, FaInfo, FaExclamation } from "react-icons/fa";
import {Row, Col, Image, ListGroup, Button, Overlay, Tooltip } from 'react-bootstrap';
import ActionCable from 'actioncable';
import Auth from '../modules/auth';
import Chat from './chat';
import '../css/request.css';

class Request extends Component {
	constructor() {
		super();
		this.state = {
			conversation: {},
			selected: "",
			fulfilled: false,
			redirect: false,
			show: false,
			volunteers: [], 
			channels: [],
			newChannel: "",

		};
		this.attachRef = target => this.setState({ target });    
		this.handleFulfilled = this.handleFulfilled.bind(this);
		this.deleteVolunteer = this.deleteVolunteer.bind(this);		
		this.cable = ActionCable.createConsumer(`${API_WS_ROOT}`);
	}

//IF CURRENT USER IS NOT THE REQUEST OWNER, SENDS 'POST' TO API SERVER TO CREATE VOLUNTEER
	componentDidMount() {
		if (this.props.user_id !== this.props.request.user_id) {
			const volunteer = {};
			volunteer["request_id"] = this.props.request.id;
			volunteer["user_id"] = this.props.user_id;
			fetch(`${API_ROOT}/volunteers`,{
				method: 'post',
				headers: {	
					'Content-Type':	'application/json',		
					token: Auth.getToken(),
					'Authorization': `Token ${Auth.getToken()}`			
				},
				body: JSON.stringify(volunteer)
			})
			.then(res => res.json())
			.then(json => {
				this.setState({
					conversation: json
				})
			})
		} else { //OWNER SUBSCRIBES TO REQUEST CHANNEL TO RECEIVE ALERTS
			this.sub = this.cable.subscriptions.create(
      			{ channel: 'RequestsChannel', request: this.props.request.id },
		    	{ received: (response) => { this.handleAlert(response) } }
    		);
		}	
		this.setState({
			volunteers: this.props.request.volunteers,			
		})
		this.createChannels(); 		
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.selected !== this.state.selected) {
			this.highlightVolunteer(this.state.selected)
		}
	}
//CREATES ARRAY WITH EXISTING CONVERSATIONS TO SUBSCRIBE TO THEIR CHANNELS
	createChannels() {
		const channels = this.state.channels;
		this.props.request && 
		this.props.request.conversations.map(conv => {
			const id = Object.values(conv);			
			channels.push(id[0])			
			return channels
		})
		this.setState({channels})		
	}

//ONLY FOR REQUEST OWNER 
	handleAlert(response) {			
		if ( response.user_id !== this.props.user_id ) {			

		//CHECKS IF INCOMING IS NEW CONVERSATION AND PASSES ID AS NEWCHANNEL TO SUBSCRIBE
			if ( this.state.channels.every(channel => channel !== response.conversation_id)) {
				const channels = this.state.channels;
				channels.push(response.conversation_id);
				this.setState({
					channels,
					newChannel: response.conversation_id
				})
			} 
		//CHECKS IF THE VOLUNTEER ALREADY EXISTS, OTHERWISE, RENDERS THE NEW NAME
			let volunteers = this.state.volunteers;
			if ( volunteers.every(volunteer => volunteer.user_id !== response.user_id)) {
				volunteers.push(response)
			 	this.setState({
			 		volunteers
			 	});		 	
			} 

			this.setState({
				selected: response.user_id}
			);
			this.highlightVolunteer(response.user_id)		
		}
	}

	highlightVolunteer(id) {	
		const volunteers = document.getElementsByClassName("volunteers")
		for ( var i=0; i<volunteers.length; i++ ) {
			volunteers[i].classList.remove("highlighted")
		}
		const x = `vol${id}`
		document.getElementById(x).classList.add("highlighted")
	}

	selectVolunteer = (id) => {
		this.setState({selected: id});
	}

	handleFulfilled(e) {
		const status = {};
		status["fulfilled"] = true;		
		e.preventDefault();
		fetch(`${API_ROOT}/requests/${this.props.request.id}`,{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json', 	       
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`			
			},
			body: JSON.stringify(status)
		})
		.then(res => res.json())
		.then(json => {this.setState({redirect: true})})
	}

	deleteVolunteer(id) {
		fetch(`${API_ROOT}/volunteers/${id}`,{
			method: 'delete',
			headers: {				
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`			
			},
		})
		.then(res => res.json())
		.then(json => {this.setState({redirect: true})})
	}

	render() {	

		const request = this.props.request;	
		const { conversation, volunteers } = this.state;
		
		return(
			<Fragment>
				<Row>
					<Col>
						<div className="p-2"><h6><Link to="/dashboard"><FaBackward /> Dashboard</Link></h6></div>
					</Col>
				</Row>
				<Row className="my-2">
					{(request.id === undefined || this.state.redirect) && <Redirect to="/" />}
					<Col md={6}>
						<div className=" py-2 border-top border-warning">
							<h4>Details:</h4>
							<ListGroup variant="flush">
								<ListGroup.Item><FaUserAlt /> {request.user_name}</ListGroup.Item>
								<ListGroup.Item><FaExclamation /> {request.req_type} </ListGroup.Item>
								<ListGroup.Item><FaInfo /> {request.title}</ListGroup.Item>
								<ListGroup.Item className="text-break"><FaTasks /> {request.body}</ListGroup.Item>
							
								<ListGroup.Item className="mx-auto">
									<Image src={`https://maps.googleapis.com/maps/api/staticmap?center=${request.lat},${request.lng}&zoom=17&size=400x200&maptype=roadmap&markers=color:blue%7C${request.lat},${request.lng}&key=${process.env.REACT_APP_GM_API_KEY}`} fluid/>
								</ListGroup.Item>
							</ListGroup>
						</div>
					</Col>
					<Col md={6}> 
						<div className="py-2 border-top border-warning">
							<h4>Status</h4>
							<div className="d-flex mx-5">
								<h6 className="py-2">Fulfilled?</h6>
								<input className="check m-2" type="checkbox" ref={this.attachRef} onChange={() => this.setState({ show: !this.state.show })}/>
								<Overlay target={this.state.target} show={this.state.show} placement="right">
						          {props => (
						            <Tooltip id="tooltip" {...props}>
						              <Button variant="success" type="button" onClick={this.handleFulfilled}>CONFIRM</Button> 
						            </Tooltip>
						          )}
						        </Overlay>
							</div>	
						</div>
					{this.props.user_id === request.user_id &&
					<div className="py-2 border-top border-warning">					

						<ListGroup>
							<h4>Volunteers:</h4>
							{volunteers !== undefined &&
								volunteers.map(volunteer => (
								<Row key={volunteer.user_id} className="my-1">
									<Col xs={9} >
										<div id={`vol${volunteer.user_id}`} className="volunteers py-1 text-center" onClick={(e) => this.selectVolunteer(volunteer.user_id)}>
											{volunteer.username}
										</div>
									</Col>
									<Col xs={3}>
										<Button variant="danger" size="sm" onClick={(e) => this.deleteVolunteer(volunteer.id)}>
											<MdDeleteForever className="delete"/>
										</Button>
									</Col> 
								</Row>
							))}								
						</ListGroup>
					</div>	
					}		
						<Chat 
							request_id={this.props.request.id} 
							conversation={conversation} 
							selected={this.state.selected} 
							sender_id={this.props.user_id} //THE VOLUNTEER
							recipient_id={this.props.request.user_id} //THE REQUEST OWNER
							channels={this.state.channels} //EXISTING CONVERSATIONS TO SUBSCRIBE
							newChannel={this.state.newChannel}
						/>
					
					</Col>			
				</Row>
			</Fragment>
		);
	}
}

export default Request;