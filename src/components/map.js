import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

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
	}

	onMarkerClick(props, marker) {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		})
	}

	onMapClick(props, map, e) {		
		const { handleShow } = this.props;
		handleShow(e.latLng.lat(), e.latLng.lng());
	}

	setMarkerColor(type){	
		let icon = "";	
  		if (type === "1" ) {
  			icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  		} else {
  			icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  		}
  		return icon
	}

	render() {  
		console.log(this.props)
		return (
			

				<Map 
					google= {this.props.google}           
					initialCenter={this.props.currentLocation}
					center={this.props.currentLocation}
					zoom={15}
					onClick={this.onMapClick}
				>

		          	{this.props.requests.map(request => (
		              <Marker
		                      key={request.id}
		                      name={request.title}
		                      position={{lat: request.lat, lng: request.lng}}
		                      icon={this.setMarkerColor(request.req_type)}
		                      onClick={this.onMarkerClick} />
		          	

		          	))
		          }         

			        <InfoWindow
			        	marker = { this.state.activeMarker }
			        	visible = { this.state.showingInfoWindow }
			        >
			        	<div>
			        		<h4>{this.state.selectedPlace.name}</h4>
			        	</div>
			        </InfoWindow>
		        </Map> 

		    
        );
	}
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCRGNVyKCcxBbVo72_EGGHnOnJHrrFbdk0")
})(RequestMap)
