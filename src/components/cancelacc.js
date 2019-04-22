import React, { Component } from 'react';
import Auth from '../modules/auth';


class CancelAcc extends Component {
	constructor() {
		super();
		this.handleCancelation=this.handleCancelation.bind(this);	
	}

	handleCancelation(e) {
    e.preventDefault();
    fetch(`http://localhost:3001/users/${this.props.user_id}`, { 
        method: 'DELETE',
        headers: {          
          token: Auth.getToken(),
          'Authorization': `Token ${Auth.getToken()}`
        }
      })
    .then(res => res.json())
    .then(json => {
      if (json.status === "ok") {
        Auth.deauthenticateUser();
        const { handleAuth } = this.props;  
        handleAuth();       
      }
      console.log(json)
    })
    .catch(error => console.log(error))

  }

	

 	render() {
    	return (
      		<div>      			 				
      			   <button type="button" onClick={this.handleCancelation}>Cancel Account</button>  
      		</div>
      				
    	);
  	}
}

export default CancelAcc;
