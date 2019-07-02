import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import RequestMap from '../components/map';


describe('<RequestMap />',() => {
	const currentLocation = {lat: 31.54563, lng: -9.3456345}
	it('renders Map', () => {
		const wrapper = mount(<RequestMap currentLocation={currentLocation}/>).find(RequestMap)
		
		expect(wrapper).toHaveLength(1)		
	})

	it('passes props correctly', () => {
		const wrapper = mount(<RequestMap currentLocation={currentLocation}/>).find(RequestMap)

		expect(wrapper.props().currentLocation).toEqual(currentLocation)		
	})

	it('matches the snapshot', () => {
		const tree = renderer.create(<RequestMap />).toJSON()
		expect (tree).toMatchSnapshot()
	})
})