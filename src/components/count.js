import React, {Component, Fragment} from 'react';
import ActionCable from 'actioncable';

class Count extends Component {
	constructor() {
		super();
		this.state = {count: ""};
		this.handleReceived = this.handleReceived.bind(this);
	}

	componentWillMount() {
		fetch('http://localhost:3001/count')
		.then(res => res.json())
		.then(json => {
			this.setState({
				count: json
			});			
		})
		this.createSocket();
	}

	createSocket(id) {
		const cable = ActionCable.createConsumer("ws://localhost:3001/cable");
		
		this.sub = cable.subscriptions.create(
      		{ channel: 'RequestCountChannel' },
		    { received: (response) => { this.handleReceived(response) } }
    	);
	}

	handleReceived(response) {
		this.setState({count: response})
	}

	render() {
		return(
			<Fragment>				
       			<div className="text-center m-2">
       				<h3>Unfulfilled help requests</h3>
       				<h1>{this.state.count}</h1>
       			</div>
			</Fragment>
			);
	}
}
export default Count;