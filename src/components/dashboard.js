import React, { Component } from 'react';
import Auth from '../modules/auth';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			user: {}
		}
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
	    	this.setState({
	    		user: json.user
	    	});
	    })
	    .catch(error => console.log(error))
	  }

  render() {
    return (
      <div>Hello {this.state.user.first_name}</div>
    );
  }
}

export default Dashboard;
