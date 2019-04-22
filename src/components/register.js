import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/auth';


class Register extends Component {
	constructor() {
		super();
		this.state = {
			user: {}
		}
		this.handleChange=this.handleChange.bind(this);	
		this.handleRegister=this.handleRegister.bind(this);	
	}

	handleChange(e) {
    	const user = this.state.user;
    	user[e.target.name] = e.target.value;
    	this.setState({ 
        	user
        });
  	}	

	handleRegister(e) {
    e.preventDefault();
    fetch('http://localhost:3001/users', { 
      method: 'POST', 
      body: JSON.stringify(this.state), 
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      if (json.token === undefined) {
        this.setState({
          errors: json   
        }); 
      } else {
        Auth.authenticateToken(json.token);
        const { handleAuth } = this.props;  
        handleAuth();  
      };
    })
    .catch(error => console.log(error))
  }

	

 	render() {
    	return (
      		<div>
      			{Auth.isUserAuthenticated() &&
      				<Redirect to="/dashboard" />
      			}
      			<form onSubmit={this.handleRegister}>
		      		<input type="text" name="username" placeholder="username" value={this.state.user.username} onChange={this.handleChange}/>
		      		<input type="password" name="password" placeholder="password" value={this.state.user.password} onChange={this.handleChange}/>
		      		<input type="email" name="email" placeholder="email" value={this.state.user.email} onChange={this.handleChange}/>
		      		<input type="text" name="first_name" placeholder="First name" value={this.state.user.first_name} onChange={this.handleChange}/>
		      		<input type="text" name="last_name" placeholder="Last name" value={this.state.user.last_name} onChange={this.handleChange}/>
		      		<input type="submit" value="OK" />
      			</form>       							
      			     
      		</div>
      				
    	);
  	}
}

export default Register;
