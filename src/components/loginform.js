import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/auth';


class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}
		this.handleChange=this.handleChange.bind(this);	
	}

	handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		})
	}


	

 	render() {
 		const errors = this.props.errors.errors;
    	return (
      		<div>
      			{Auth.isUserAuthenticated() &&
      				<Redirect to="/dashboard" />
      			}
      			<form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
		      		<input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
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
