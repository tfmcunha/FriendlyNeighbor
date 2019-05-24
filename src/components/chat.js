import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { ActionCableConsumer } from 'react-actioncable-provider';

class Chat extends Component {

	constructor() {
		super();		
		this.state = {
			conversation_id: "",
			message: {},
			response: []
		};
		this.handleReceived = this.handleReceived.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleNewMessage = this.handleNewMessage.bind(this);
	}

	componentWillMount(){
		if (this.props.sender_id === this.props.recipient_id) {
			console.log("standing by...")
		} else {
			this.handleConversation()
		}
	}

	handleConversation() {
		const conversation = {request_id: this.props.request_id, sender_id: this.props.sender_id, recipient_id: this.props.recipient_id}
		fetch('http://localhost:3001/conversations', { 
       		method: 'POST', 
        	body: JSON.stringify(conversation), 
        	headers: {
	        'Content-Type': 'application/json'
	      	}
	    })
	    .then(res => res.json())
	    .then(json => {
	    	this.setState({
	    		conversation_id: json.conversation_id
	    	})
	    })
	}

	handleReceived(response) {
		console.log("response",response);
		this.setState({		
				response			
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
	        'Content-Type': 'application/json'
	      	}
	    })
	    .then(res => res.json())
	    .then(json => {console.log("done")})
	      
    }

	render() {	
		console.log(this.state.response)
		return(
			<Row>
				<ActionCableConsumer
        	  		channel="ConversationsChannel"
          			onReceived={this.handleReceived}
        		>		
       				{this.state.response.map(message => (
       					<div>{message.body}</div>
       				))}
       			</ActionCableConsumer>

       			<Form onSubmit={this.handleNewMessage}>
				  <Form.Group as={Row} controlId="formPlaintextPassword">
				    <Form.Label column sm="2">
				      Message
				    </Form.Label>
				    <Col sm="10">
				      <Form.Control type="text" placeholder="write here" name="body" value={this.state.message.body} onChange={this.handleChange}/>
				    </Col>
				  </Form.Group>
				  <Button variant="primary" type="submit">
				    Send
				  </Button>
				</Form>


			</Row>
		);
	}
}

export default Chat;