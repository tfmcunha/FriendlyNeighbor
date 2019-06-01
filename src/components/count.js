import React, {Component} from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

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
	}

	handleReceived(response) {
		this.setState({count: response})
	}

	render() {
		return(
			<div>
				<ActionCableConsumer
        	  		channel="RequestCountChannel"        	  				
          			onReceived={this.handleReceived}
           		>		       				
       			</ActionCableConsumer>
       			<h3>
       				Unfulfilled help requests{this.state.count}
       			</h3>
			</div>
			);
	}
}
export default Count;