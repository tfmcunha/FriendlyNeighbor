import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './modules/auth';
import Home from './components/home';
import LoginForm from './components/loginform';
import Dashboard from './components/dashboard';

class App extends Component {
	constructor() {
		super();
		this.state = {
			auth: Auth.isUserAuthenticated()
		}

    this.handleSubmit=this.handleSubmit.bind(this); 
	}

  handleSubmit(e, data) {
    e.preventDefault();
    fetch('http://localhost:3001/login', { 
      method: 'POST', 
      body: JSON.stringify(data), 
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      if (json.token === undefined) {
        console.log(json)
      } else {
        Auth.authenticateToken(json.token)
      };
      this.setState({
        auth: Auth.isUserAuthenticated()   
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route 
          exact path="/login" 
          render={() => this.state.auth
            ? <Redirect to="/dashboard" />
            : <LoginForm handleSubmit={this.handleSubmit} />
          } /> 
        <Route exact path="/dashboard" component={Dashboard} />      
      </div>
    );
  }
}

export default App;
