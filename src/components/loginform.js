import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Auth from '../modules/auth';


class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			loginData: {},
			errors: {}
		}
		this.handleChange=this.handleChange.bind(this);	
		this.handleLogin=this.handleLogin.bind(this);	
	}

	handleAuthentication() {
		this.setState({
			auth: Auth.isUserAuthenticated()
		})
	}  

	handleChange(e) {
		const loginData = this.state.loginData;
		loginData[e.target.name] = e.target.value;
		this.setState({
			loginData
		})
	}

	handleLogin(e) {
	    e.preventDefault();
	    fetch('http://localhost:3001/login', { 
	      method: 'POST', 
	      body: JSON.stringify(this.state.loginData), 
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    })
	    .then(res => res.json())
	    .then(json => {
	    	if (json.token !== undefined) {
		    	Auth.authenticateToken(json.token);		    	
		    	this.handleAuthentication();
		    } else {
		    	this.setState({
		    		errors: json
		    	})
		    }		    
	    })	       
	  }


	

 	render() {
 		const errors = this.state.errors.errors; 		
		
    	return (
      		<div className="p-4">
      			{Auth.isUserAuthenticated() &&
      				<Redirect to="/dashboard" />
      			}
	      			<h3 className="text-center">LOGIN</h3>
	      			<Form onSubmit={this.handleLogin}>
	      				<Form.Group>
	      					<Form.Label>E-mail</Form.Label>
			      			<Form.Control type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
						</Form.Group>		      			
			      		<Form.Group>
			      			<Form.Label>Password</Form.Label>
			      			<Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
			      		</Form.Group>
			      		<Button variant="primary" type="submit" >OK</Button>		      		
	      			</Form> 

	      			{errors !== undefined &&
	      				errors.map(error => (
	      					<div key="">{error.detail}</div>
	      				))
	      			}				
      			
      		</div>
      				
    	);
  	}
}

export default LoginForm;
