import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from '../modules/auth';
import Footer from './footer';
import Splash from './splash';
import Dashboard from './dashboard';
import Help from './help';
import NotFound from './404notfound';

class Main extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			auth: Auth.isUserAuthenticated(),
			show: false
		};
		this.handleAuthentication=this.handleAuthentication.bind(this);		
	}

	handleAuthentication() {
		this.setState({
			auth: Auth.isUserAuthenticated()
		})
	}  

	render() {
		return (        
			<div className="mb-5"> 	
				<Switch>
					<Route 
						exact path="/" 
						render={() => this.state.auth
							? <Redirect to="/dashboard" />
							: <Splash /> 
					} />

					<Route 
						path="/dashboard" 
						render={() => <Dashboard user={this.state.user} handleAuth={this.handleAuthentication} /> } 
					/>      

					<Route 
						path="/help"
						component={Help}
					/>

					<Route component={NotFound} />
				</Switch>	
				
				<Footer />
			</div>
		);
	}
}

export default Main;
