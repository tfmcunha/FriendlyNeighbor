import React, { Component } from 'react';
import { API_ROOT } from '../constants';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/auth';
import { Form, Button } from 'react-bootstrap';
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
    const govid = this.state.govid;
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

    if (!govid) {
      formIsValid = false;
      errors["govid"] = "*Must select a file";
    } else {
      const types = ['application/pdf', 'image/jpeg', 'image/png'];
      if (types.every(type => govid.type !== type)) {
        formIsValid = false;
        errors["govid"] = "*Invalid file type";
      }
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
      fetch(`${API_ROOT}/users`, { 
        method: 'POST', 
        body: user, 
      })
      .then(res => res.json())
      .then(json => {          
          if (json.token !== undefined) {
            Auth.authenticateToken(json.token);
            this.handleAuthentication();   
          } else {                    
            this.setState({
              apierrors: json.errors
            })
          }   
      })
    }
  }

	

 	render() {
    	return (
      		<div className="p-4">
      			{Auth.isUserAuthenticated() &&
      				<Redirect to="/dashboard" />
      			}
            <h3 className="text-center">Create a new account</h3>
      			<Form onSubmit={this.handleRegister}>		      		
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" name="email"value={this.state.email} onChange={this.handleChange} autoComplete="off"/>                
                <Form.Text className="text-danger">{this.state.errors.email}</Form.Text>
                <ErrorsHandler errors={this.state.apierrors.email} field="Email" />
              </Form.Group> 
              <Form.Group>
                <Form.Label>Password</Form.Label>
  		      		<Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange}/>		      		
  		      		<Form.Text className="text-danger">{this.state.errors.password}</Form.Text>
              </Form.Group>     
              <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} autoComplete="off"/>
  		      		<Form.Text className="text-danger">{this.state.errors.first_name}</Form.Text>
              </Form.Group> 
              <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} autoComplete="off"/>
                <Form.Text className="text-danger">{this.state.errors.last_name}</Form.Text>
              </Form.Group> 
              <Form.Group> 
                <Form.Label>Upload government ID</Form.Label>
                <Form.Control type="file" name="govid" accept="application/pdf, image/png, image/jpeg" onChange={this.handleFile}/>
                <Form.Text className="text-danger">{this.state.errors.govid}</Form.Text>
              </Form.Group> 
  		      	<Button variant="primary" type="submit">Register</Button>
      			</Form>  

      		</div>
      				
    	);
  	}
}

export default Register;
