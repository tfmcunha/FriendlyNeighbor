import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './modules/auth';
import Home from './components/home';
import LoginForm from './components/loginform';
import Dashboard from './components/dashboard';
import Register from './components/register';

class App extends Component {
	constructor() {
		super();
		this.state = {
			auth: Auth.isUserAuthenticated(),
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
      <div>        
        <Route 
          exact path="/" 
          render={() => this.state.auth
            ? <Redirect to="/dashboard" />
            : <Home /> 
        } />
          
        
        <Route 
          exact path="/dashboard" 
          render={() => <Dashboard handleAuth={this.handleAuthentication} /> } 
        />      
        
      </div>
    );
  }
}

export default App;
