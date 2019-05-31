import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { ActionCableConsumer } from 'react-actioncable-provider';
import Auth from '../modules/auth';
import '../css/chat.css';

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
		this.handleReceived = this.handleReceived.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleNewMessage = this.handleNewMessage.bind(this);
		this.chatbox = React.createRef()

	}

	componentWillMount(){		
		if (this.props.sender_id !== this.props.recipient_id) {			
			const conversation = {request_id: this.props.request_id, sender_id: this.props.sender_id, recipient_id: this.props.recipient_id};
			this.handleConversation(conversation)
		};	
	}

	componentDidUpdate(prevProps) {	
		if (prevProps.selected !== this.props.selected) {
			if (this.props.sender_id === this.props.recipient_id) {
				const conversation = {request_id: this.props.request_id, sender_id: this.props.sender_id, recipient_id: this.props.selected};
				this.handleConversation(conversation)
			};	
		}
		this.scrollToBottom()

	}

	handleConversation(conversation) {
		
		fetch('http://localhost:3001/conversations', { 
       		method: 'POST', 
        	body: JSON.stringify(conversation), 
        	headers: {
	        	'Content-Type': 'application/json',
	        	token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`
	      	}
	    })
	    .then(res => res.json())
	    .then(json => {
	    	this.setState({
	    		conversation_id: json.id,
	    		conversation: json.messages
	    	})
	    })
	}

	scrollToBottom(){
   		var chatbox = this.chatbox; 
   		if (chatbox.current !== null ) {		
			chatbox.current.scrollTop = chatbox.current.scrollHeight
   		}
	}

	handleReceived(response) {
		this.setState({	
				conversation_id: response.id,
				conversation: response.messages			
		});		
		
    }

    handleChange(e){
    	const message = this.state.message;
    	message[e.target.name] = e.target.value;
    	this.setState({message}); 	
    	
    }

    handleNewMessage(e) {
    	e.preventDefault();
    	const message = this.state.message;
    	message["conversation_id"] = this.state.conversation_id;
    	message["user_id"]= this.props.sender_id;
    	fetch('http://localhost:3001/messages', { 
       		method: 'POST', 
        	body: JSON.stringify(this.state.message), 
        	headers: {
	        	'Content-Type': 'application/json',
	        	token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`
	      	}
	    })
	    .then(res => res.json())
	    .then(json => {console.log("done")})
	    e.target.reset();
	    this.setState({message: {body: ""}})
	      
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

	render() {			
		const messages = this.state.conversation;		
		return(
			<Row>
				<ActionCableConsumer
        	  		channel="ConversationsChannel"
          			onReceived={this.handleReceived}
           		>		       				
       			</ActionCableConsumer>
       			<Col>
       				<div className="p-2">
		       			<div ref={this.chatbox} className="max-vh-25 overflow-auto chatbox">
		       			{messages !== undefined &&
		       				messages.map(message => (
		       					<div key={message.id} className="d-flex ">	       						
		       						<div className={`${this.setUserMessageLayout(message.user_id)} p-2 my-2 message`}>
		       							<span className="d-block user">{message.user_name} says:</span>
		       							<span>{message.body}</span>

		       						</div>
		       					</div>
		       				))}
		       			</div>
		       			<Form onSubmit={this.handleNewMessage}>
						  <Form.Row>
						    <Col xs={10}>
						      <Form.Control type="text" placeholder="Write message here" name="body" value={this.state.message.body} onChange={this.handleChange}/>
						   	</Col>
						  	<Col xs={2}>
							  <Button variant="primary" type="submit">
							    Send
							  </Button>
							</Col>
						  	</Form.Row>
						</Form>
					</div>
				</Col>


			</Row>
		);
	}
}

export default Chat;