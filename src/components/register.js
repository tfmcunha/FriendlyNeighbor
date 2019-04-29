import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/auth';
import ErrorsHandler from './errorshandler';


class Register extends Component {
	constructor() {
		super();
		this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      govid: null,
      errors: {},
      apierrors: {}
    }
		this.handleChange=this.handleChange.bind(this);	
		this.handleRegister=this.handleRegister.bind(this);	
    this.handleFile=this.handleFile.bind(this); 
    
	}

	handleChange(e) {
    	const name = e.target.name;
      const value = e.target.value;
    	this.setState({ 
        	[name]: value,
          apierrors: {}
        });
  	}	

  handleFile(e) {    
    const govid = e.target.files[0];
    this.setState({ 
      govid
    }); 
  }  

  validateForm() {
    const email = this.state.email;
    const password = this.state.password;
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    let errors ={};
    let formIsValid = true;

    if (!first_name) {
      formIsValid = false;
      errors["first_name"] = "*Enter your first name!";
    }

    if (!last_name) {
      formIsValid = false;
      errors["last_name"] = "*Enter your last name!";
    }

    if (!email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email";
    } 

    if (typeof email !== "undefined") {      
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email)) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email.";
      }
    }

    if (!password) {
      formIsValid = false;
      errors["password"] = "*Please enter a password";
    } 

    this.setState({
      errors
    })

    return formIsValid;

  }
  
	handleRegister(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const user = new FormData();    
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
          if (json.token !== undefined) {
            Auth.authenticateToken(json.token);
            const { handleAuth } = this.props;  
            handleAuth();    
          } else {                    
            this.setState({
              apierrors: JSON.parse(JSON.stringify(json.errors))
            })
          }   
      })
    }
  }

	

 	render() {
    	return (
      		<div>
      			{Auth.isUserAuthenticated() &&
      				<Redirect to="/dashboard" />
      			}
            
      			<form onSubmit={this.handleRegister}>		      		
              <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange}/>
              
              <div>{this.state.errors.email}</div>
              <ErrorsHandler errors={this.state.apierrors.email} field="Email" />
              
		      		<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>		      		
		      		<div>{this.state.errors.password}</div>
              <input type="text" name="first_name" placeholder="First name" value={this.state.first_name} onChange={this.handleChange}/>
		      		<div>{this.state.errors.first_name}</div>
              <input type="text" name="last_name" placeholder="Last name" value={this.state.last_name} onChange={this.handleChange}/>
              <div>{this.state.errors.last_name}</div>
              <input type="file" name="govid" onChange={this.handleFile}/>
		      		<input type="submit" value="OK" />
      			</form>  

      		</div>
      				
    	);
  	}
}

export default Register;
