import React, { Component } from 'react';
import Auth from '../modules/auth';
import { Modal, Button } from 'react-bootstrap';
import { API_ROOT } from '../constants';


class CancelAcc extends Component {
	constructor() {
		super();
    this.state = { show: false, redirect: false};
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
    fetch(`${API_ROOT}/users/${this.props.user_id}`, { 
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
    })
  }	

  render() {
    return (
      <div className="py-3 border-top border-warning">         
        <Button variant="danger" onClick={this.handleShow}>
          Cancel Account
        </Button>

        <Modal size="sm" show={this.state.show} onHide={this.handleClose}>
          <div className="m-3 text-center">
            <h6>This action cannot be undone!!</h6>
            <Button variant="danger" onClick={this.handleCancelation}>Confirm</Button>  
          </div>
        </Modal>
      </div>
    );
  }

}

export default CancelAcc;
