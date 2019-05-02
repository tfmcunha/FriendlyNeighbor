import React, {Component} from 'react';
import Auth from '../modules/auth';
import { Form, Button } from 'react-bootstrap';

class NewRequest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			request: {},
			errors: {}
		};
		this.handleNewRequest=this.handleNewRequest.bind(this);
		this.handleChange=this.handleChange.bind(this);
	}

	handleChange(e) {
		const request = this.state.request;
		request["user_id"] = this.props.user_id;
		request[e.target.name] = e.target.value;
		this.setState({
			request
		})
	}

	validateForm() {
	    const request = this.state.request;
	    let errors ={};
	    let formIsValid = true;

	    if (!request["title"]) {
	      formIsValid = false;
	      errors["title"] = "*Enter a title!";
	    }

	    if (!request["body"]) {
	      formIsValid = false;
	      errors["body"] = "*Enter a description (300 characters max)!";
	    }

	    if (!request["req_type"]) {
	      formIsValid = false;
	      errors["req_type"] = "*Choose a help type!";
	    } 	    

	    this.setState({
	      errors
	    })

	    return formIsValid;

	  }

	handleNewRequest(e) {
		e.preventDefault();
		if(this.validateForm()) {
			console.log(this.state);
			const request = JSON.stringify(this.state.request);
			fetch('http://localhost:3001/requests', { 
	        	method: 'POST', 
	        	body: request, 
	        	headers: {	        
		      		token: Auth.getToken(),
		        	'Authorization': `Token ${Auth.getToken()}`,
		        	'Content-Type': 'application/json'
		      	}        	
	      	})
	      	.then(res => res.json())
	      	.then(json => console.log(json))
	    } else {
	    	console.log("Form content not valid!")
	    }
	}

	render() {
		return(
			<div className="p-4">
				<div className="text-center">Add new help request</div>
				<Form onSubmit={this.handleNewRequest}>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control type="text" name="title"  onChange={this.handleChange} />
						<Form.Text className="text-danger">{this.state.errors.title}</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control as="textarea" rows="3" name="body" onChange={this.handleChange}/>
						<Form.Text className="text-danger">{this.state.errors.body}</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label>Request Type:</Form.Label>
						<Form.Check type="radio" label="Task" name="req_type" value="0" onChange={this.handleChange} />
						<Form.Check type="radio" label="Material" name="req_type" value="1" onChange={this.handleChange} />
						<Form.Text className="text-danger">{this.state.errors.req_type}</Form.Text>
					</Form.Group>
					<Button variant="primary" type="submit">Send</Button>
				</Form>
			</div>
		);
	}
}

export default NewRequest;