import React, { Component } from 'react';
import { API_ROOT } from '../constants';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Auth from '../modules/auth';


class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			form_errors: {},
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
		const name = e.target.name;
     	const value = e.target.value;
    	this.setState({ 
        	[name]: value,
		})
	}

	validateForm() {
		const email = this.state.email;
		const password = this.state.password;		
		let form_errors = {};
		let formIsValid = true;

		if (!email) {
			formIsValid = false;
			form_errors["email"] = "*Please enter your email";
		} 

		if (typeof email !== "undefined") {      
			var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if (!pattern.test(email)) {
				formIsValid = false;
				form_errors["email"] = "*Please enter valid email.";
			}
		}

		if (!password) {
			formIsValid = false;
			form_errors["password"] = "*Please enter your password";
		}

		this.setState({
			form_errors
		})

		return formIsValid;

	}

	handleLogin(e) {
		e.preventDefault();
		const loginData = {}
		loginData["email"] = this.state.email
		loginData["password"] = this.state.password
		if ( this.validateForm() ) {		    
		    fetch(`${API_ROOT}/login`, { 
		      method: 'POST', 
		      body: JSON.stringify(loginData), 
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
			      			<Form.Control type="text" name="email" value={this.state.email} onChange={this.handleChange} autoComplete="off"/>
			      			<Form.Text className="text-danger">{this.state.form_errors.email}</Form.Text>
						</Form.Group>		      			
			      		<Form.Group>
			      			<Form.Label>Password</Form.Label>
			      			<Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
			      			<Form.Text className="text-danger">{this.state.form_errors.password}</Form.Text>
			      		</Form.Group>
			      		{errors !== undefined &&
	      				errors.map(error => (
	      					<Form.Group>
	      						<Form.Text className="text-danger">*{error.detail}</Form.Text>
	      					</Form.Group>
	      				))
	      				}
			      		<Button variant="primary" type="submit" >OK</Button>		      		
	      			</Form>      			
      		</div>      				
    	);
  	}
}

export default LoginForm;
