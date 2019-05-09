import React, { Component, Fragment } from 'react';
import { Modal} from 'react-bootstrap';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import NewRequest from './newrequest';


class RequestMap extends Component {
	constructor(props) {
		super(props);
		this.state = {			
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {}
		};    
    	this.onMarkerClick = this.onMarkerClick.bind(this);
    	this.onMapClick = this.onMapClick.bind(this);
    	this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
	}

	

	onMarkerClick(props, marker) {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		})
	}

	onMapClick(props, map, e) {
		console.log(e.latLng.lat());
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	}



	handleShow() {
		this.setState({ show: true });
	}

	handleClose() {
		this.setState({ show: false });
	}


	render() {     
		return (
			<Fragment>

				<Map 
					google= {this.props.google}           
					initialCenter={this.props.currentLocation}
					zoom={15}
					onClick={this.onMapClick}
				>

		          	{//riders.map(rider => (
		          //    <Marker
		          //            key={rider.id}
		          //            title={rider.first_name}
		          //            name={rider.first_name+' '+rider.last_name}
		           //           position={{lat: rider.latitude, lng: rider.longitude}}
		           //           onClick={this.onMarkerClick} />

		          	//))
		          }         

			        <InfoWindow
			        	marker = { this.state.activeMarker }
			        	visible = { this.state.showingInfoWindow }
			        >
			        	<div>
			        		<h2>teste</h2>
			        	</div>
			        </InfoWindow>
		        </Map> 

				<Modal size="lg" show={this.state.show} onHide={this.handleClose}>
					<NewRequest user_id={this.props.user.id} close={this.handleClose} />
				</Modal>

		    </Fragment>
        );
	}
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCRGNVyKCcxBbVo72_EGGHnOnJHrrFbdk0")
})(RequestMap)
