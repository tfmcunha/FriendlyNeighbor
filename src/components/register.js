import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/auth';


class Register extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      govid: null
		}
		this.handleChange=this.handleChange.bind(this);	
		this.handleRegister=this.handleRegister.bind(this);	
    this.handleFile=this.handleFile.bind(this); 
	}

	handleChange(e) {
    	const name = e.target.name;
      const value = e.target.value;
    	this.setState({ 
        	[name]: value
        });
  	}	

  handleFile(e) {    
    const govid = e.target.files[0];
    this.setState({ 
      govid
    }); 
  }  

	handleRegister(e) {
    e.preventDefault();
    const user = new FormData();
    user.append('user[username]', this.state.username);
    user.append('user[email]', this.state.email);
    user.append('user[password]', this.state.password);
    user.append('user[first_name]', this.state.first_name);
    user.append('user[last_name]', this.state.last_name);
    user.append('user[govid]', this.state.govid);     
    fetch('http://localhost:3001/users', { 
      method: 'POST', 
      body: user, 
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
		      		<input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
		      		<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
		      		<input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange}/>
		      		<input type="text" name="first_name" placeholder="First name" value={this.state.first_name} onChange={this.handleChange}/>
		      		<input type="text" name="last_name" placeholder="Last name" value={this.state.last_name} onChange={this.handleChange}/>
              <input type="file" name="govid" onChange={this.handleFile}/>
		      		<input type="submit" value="OK" />
      			</form>       							
      			     
      		</div>
      				
    	);
  	}
}

export default Register;
