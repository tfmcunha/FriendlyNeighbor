import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../modules/auth';
import Menu from './menu';
import RequestsList from './requestslist';
import RequestDetail from './requestdetail';
import Profile from './profile';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			currentRequest: {},
			show: false
		}
		this.handleLogout = this.handleLogout.bind(this);
		this.handleRequest = this.handleRequest.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
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

	  handleShow() {
	  	this.setState({ show: true });
	  }

	  handleClose() {
	  	this.setState({ show: false });
	  }

  render() {
    return (
      	<div>
      		{!(Auth.isUserAuthenticated()) &&
      			<Redirect to="/" />
      		}
      		<Menu user={this.state.user} handleLogout={this.handleLogout}/>     
      		<Route 
				exact path="/dashboard" 
				render={() => 
					<div>
						<RequestsList user_id={this.state.user.id} requests={this.state.user.requests} handleRequest={this.handleRequest} />
      					<RequestDetail request={this.state.currentRequest} />    
      				</div>
				} 
			/> 
			<Route 
				exact path="/dashboard/profile"
				render={() => 					
					<Profile user={this.state.user} />      					      				
				}
			/>   
      		
      	</div>
    );
  }
}

export default Dashboard;
