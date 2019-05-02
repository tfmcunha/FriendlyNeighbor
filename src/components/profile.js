import React, { Component } from 'react';

class Profile extends Component {
	render() {
		return (        
			<div>        
				<h1>PROFILE</h1>
				{this.props.user.first_name}
				{this.props.user.last_name}
			</div>
		);
	}
}

export default Profile;