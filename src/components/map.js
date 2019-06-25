import React, { Component, Fragment } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class RequestMap extends Component {
	constructor() {
		super();		      	
    	this.onMapClick = this.onMapClick.bind(this); 
    	this.mapDragged = this.mapDragged.bind(this);    	
	}

	onMapClick(props, map, e) {		
		const { handleNewRequest } = this.props;
		handleNewRequest(e.latLng.lat(), e.latLng.lng());
	}

	setMarkerColor(type){	
		let icon = "";	
  		if (type === "Materials" ) {
  			icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  		} else {
  			icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  		}
  		return icon
	}

	mapDragged(props, map) {
		let newCenter = {lat:"", lng:""};
		newCenter["lat"] = map.getCenter().lat();
		newCenter["lng"] = map.getCenter().lng();
		const { onMapDrag } = this.props;
		onMapDrag(newCenter)
	}



	render() {  
		return (
			<Fragment>

				<Map 
					google= {this.props.google}           
					initialCenter={this.props.currentLocation}
					center={this.props.currentLocation}
					zoom={15}
					zoomControl={false}
					scrollwheel={false}
					onClick={this.onMapClick}
					onDragend={this.mapDragged}
				>

		          	{this.props.requests.map(request => (
		              	<Marker
		                    key={request.id}
		                    name={request.title}
		                    position={{lat: request.lat, lng: request.lng}}
		                    icon={this.setMarkerColor(request.req_type)}
		                    onClick={(e) => this.props.handleRequest(request.id)} 
		               	/>		          	
		          		))
		          	}     
		        </Map> 
		    </Fragment>		    
        );
	}
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GM_API_KEY)
})(RequestMap)
