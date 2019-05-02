import React, { Component } from 'react';
import Auth from '../modules/auth';
import { Modal, Button } from 'react-bootstrap';


class CancelAcc extends Component {
	constructor() {
		super();
    this.state = { show: false};
    this.handleShow=this.handleShow.bind(this); 
    this.handleClose=this.handleClose.bind(this); 
		this.handleCancelation=this.handleCancelation.bind(this);	
	}

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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
      

      <Button variant="primary" onClick={this.handleShow}>
        Cancel Account
      </Button>

      <Modal size="sm" show={this.state.show} onHide={this.handleClose}>
        this action cannot be undone!
        <Button variant="danger" onClick={this.handleCancelation}>Confirm</Button>  
      </Modal>
    </div>
      				
    	);
  	}
}

export default CancelAcc;
