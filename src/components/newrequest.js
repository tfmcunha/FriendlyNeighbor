import React, {Component} from 'react';
import Auth from '../modules/auth';

class NewRequest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			request: {}
		};
		this.handleNewRequest=this.handleNewRequest.bind(this);
		this.handleChange=this.handleChange.bind(this);
	}

	handleChange(e) {
		const request = this.state.request;
		request["user_id"] = this.props.user_id;
		request[e.target.name] = e.target.value;
		this.setState({
			request
		})
	}

	handleNewRequest(e) {
		e.preventDefault();
		console.log(this.state);
		fetch('http://localhost:3001/requests', { 
        	method: 'POST', 
        	body: JSON.stringify(this.state), 
        	headers: {	        
	      		token: Auth.getToken(),
	        	'Authorization': `Token ${Auth.getToken()}`
	      	},
        	
      	})
      	.then(res => res.json())
      	.then(json => console.log(json))
	}

	render() {
		return(
			<div>
				<form onSubmit={this.handleNewRequest}>

					<input type="text" name="title" placeholder="title" onChange={this.handleChange} />
					<input type="text" name="body" placeholder="body" onChange={this.handleChange}/>
					<input type="radio" name="type" value="0" onChange={this.handleChange} />Task
					<input type="radio" name="type" value="1" onChange={this.handleChange} />Material
					<input type="submit" value="Send"/>
				</form>
			</div>
		);
	}
}

export default NewRequest;