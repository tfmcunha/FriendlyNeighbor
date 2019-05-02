import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../modules/auth';
import Menu from './menu';
import Splash from './splash';
import Dashboard from './dashboard';

class Main extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			auth: Auth.isUserAuthenticated(),
			show: false
		};
		this.handleAuthentication=this.handleAuthentication.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {    
		fetch('http://localhost:3001/profile', { 
			method: 'GET',
			headers: {	        
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`
			}
		})
		.then(res => res.json())
		.then(json => {
			if (json.user !== undefined ) {
				this.setState({
					user: json.user
				});
			} else {
				Auth.deauthenticateUser();
				this.handleAuthentication();
			}
		})	    
	}

	handleLogout() {
		Auth.deauthenticateUser();
	}

	handleAuthentication() {
		this.setState({
			auth: Auth.isUserAuthenticated()
		})
	}  

	render() {
		return (        
			<div> 
			<Menu user={this.state.user} handleLogout={this.handleLogout}/>          
			<Route 
			exact path="/" 
			render={() => this.state.auth
				? <Redirect to="/dashboard" />
				: <Splash /> 
			} />


			<Route 
			exact path="/dashboard" 
			render={() => <Dashboard user="this.state.user" handleAuth={this.handleAuthentication} /> } 
			/>      

			</div>
			);
	}
}

export default Main;
