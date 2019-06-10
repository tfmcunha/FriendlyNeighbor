import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import ActionCable from 'actioncable';
import Auth from '../modules/auth';
import '../css/chat.css';
import { API_ROOT, API_WS_ROOT } from '../constants';

class Chat extends Component {

	constructor() {
		super();		
		this.state = {
			conversation_id: "",
			conversation: [],
			message: {
				body:""
			}
		};		
		this.handleChange = this.handleChange.bind(this);
		this.handleNewMessage = this.handleNewMessage.bind(this);		
		this.handleReceived = this.handleReceived.bind(this);
		this.chatbox = React.createRef()

	}

	createSocket(id) {
		const cable = ActionCable.createConsumer(`${API_WS_ROOT}`);
		
		this.sub = cable.subscriptions.create(
      		{ channel: 'ConversationsChannel', conversation: id },
		    { received: (response) => { this.handleReceived(response) } }
    	);
	}

	componentWillMount() {
		if (this.props.sender_id !== this.props.recipient_id) {			
			const conversation = {request_id: this.props.request_id, sender_id: this.props.sender_id};
			this.handleConversation(conversation)
		};
	}

	componentDidUpdate(prevProps) {	
		if (prevProps.selected !== this.props.selected) {
			if (this.props.sender_id === this.props.recipient_id) {
				const conversation = {request_id: this.props.request_id, sender_id: this.props.selected};
				this.handleConversation(conversation)
			};	
		}
		this.scrollToBottom()

	}

	handleConversation(conversation) {		
		fetch(`${API_ROOT}/conversation`,{
			method: "GET",
			headers: {
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`,
				"request": conversation.request_id,
				"sender": conversation.sender_id
			}
		})
	    .then(res => res.json())
	    .then(json => {
	    	this.setState({
	    		conversation_id: json.id,
	    		conversation: json.messages
	    	}, () => this.createSocket(json.id))
	    })
	}

	scrollToBottom(){
   		var chatbox = this.chatbox; 
   		if (chatbox.current !== null ) {		
			chatbox.current.scrollTop = chatbox.current.scrollHeight
   		}
	}

	handleReceived(response) {
		let incoming = response.message;
		let conversation_id = response.id;
		let conversation = this.state.conversation;
		conversation.push(incoming);
		this.setState({	
				conversation, 
				conversation_id			
		});		
    }

    

    setUserMessageLayout = (id) => {
    	let clss = "";
    	if (id === this.props.sender_id) {
    		clss = "ml-auto out"
    	} else {
    		clss = "mr-auto in"
    	}
    	return clss
    }

    handleChange(e){
    	e.preventDefault();
    	const message = this.state.message;
    	message[e.target.name] = e.target.value;
    	this.setState({message}); 	
    	
    }

    handleNewMessage(e) {
    	e.preventDefault();
    	const message = this.state.message;
    	message["conversation_id"] = this.state.conversation_id;
    	message["user_id"]= this.props.sender_id;
    	fetch(`${API_ROOT}/messages`, { 
       		method: 'POST', 
        	body: JSON.stringify(this.state.message), 
        	headers: {
	        	'Content-Type': 'application/json'
	      	}
	    })
	    .then(res => res.json())
	    .then(json => {console.log("done")})
	    e.target.reset();
	    this.setState({message: {body: ""}})
	      
    }

	render() {			
		const messages = this.state.conversation;		
		return(
			<Row>		     					
       			<Col>
       			 	<div className="p-2 chatcontainer mt-3">       			 	
		       			<div ref={this.chatbox} className="max-vh-25 overflow-auto chatbox">
		       			{messages !== undefined &&
		       				messages.map(message => (
		       					<div key={message.id} className="d-flex">	       						
		       						<div className={`${this.setUserMessageLayout(message.user_id)} p-2 m-2 message`}>
		       							<span className="d-block user">{message.user_name} says:</span>
		       							<span>{message.body}</span>

		       						</div>
		       					</div>
		       				))}
		       			</div>
		       			<div>
			       			<Form onSubmit={this.handleNewMessage}>
							    <Form.Row>
							    	<Col xs={10}>
							      		<Form.Control type="text" placeholder="Write message here" name="body" value={this.state.message.body} onChange={this.handleChange} autoComplete="off"/>
							   		</Col>
							  		<Col xs={2}>
								  		<Button variant="primary" type="submit" className="d-flex ml-auto">
								    		OK
								  		</Button>
									</Col>
							  	</Form.Row>
							</Form>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}

export default Chat;