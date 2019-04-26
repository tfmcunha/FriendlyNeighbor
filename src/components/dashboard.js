import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../modules/auth';
import CancelAcc from './cancelacc';
import RequestsList from './requestslist';
import RequestDetail from './requestdetail';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			currentRequest: {}
		}
		this.handleLogout = this.handleLogout.bind(this);
		this.handleRequest = this.handleRequest.bind(this);
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
		    	const { handleAuth } = this.props;  
        		handleAuth(); 
		    }
	    })
	    .catch(error => console.log(error))
	  }

	  handleLogout() {
	  	Auth.deauthenticateUser();
	  }

	  handleRequest(request) {
	  	this.setState({
	  		currentRequest:request
	  	})
	  }

  render() {
    return (
      	<div>
      		{!(Auth.isUserAuthenticated()) &&
      			<Redirect to="/" />
      		}
      		Hello {this.state.user.first_name}
      		<a href="/" onClick={this.handleLogout}>Logout</a>
      		<CancelAcc user_id={this.state.user.id} handleAuth={this.props.handleAuth}/>        
      		<RequestsList user_id={this.state.user.id} requests={this.state.user.requests} handleRequest={this.handleRequest} />
      		<RequestDetail request={this.state.currentRequest} />
      	</div>
    );
  }
}

export default Dashboard;
