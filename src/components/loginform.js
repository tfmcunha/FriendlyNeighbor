import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
		    	Auth.authenticateToken(json.token)
		    	const {handleAuth} = this.props;
		    	handleAuth();
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
      		<div>
      			{Auth.isUserAuthenticated() &&
      				<Redirect to="/dashboard" />
      			}
      			<form onSubmit={this.handleLogin}>
		      		<input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange}/>
		      		<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
		      		<input type="submit" value="OK" />
      			</form> 

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
