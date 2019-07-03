import React from 'react';

import NewRequest from '../components/newrequest';

describe('<NewRequest />', () => {
	let wrapper;
	const newLocation={lat: 31.1231, lng: -9.345345}
	it('has 4 input fields', () => {
		wrapper = shallow(<NewRequest newLocation={newLocation}/>);
		expect(wrapper.find({type: "text"}).length).toEqual(1)
		expect(wrapper.find({name: "body"}).length).toEqual(1)
		expect(wrapper.find({type: "radio"}).length).toEqual(2)		
	})

	it('changes state when writing into an input field', () => {
			
		wrapper = shallow(<NewRequest newLocation={newLocation}/>);
		
		const event = {target: { name:"title", value: "test" }};
		const field = wrapper.find({ type: "text" });
		field.prop("onChange")(event);

		expect(wrapper.state().request.title).toEqual("test");
	})

	it('calls function that sends new user data to server on button click', () => {
		const handleNewRequest = jest.spyOn(NewRequest.prototype, 'handleNewRequest');
		wrapper = mount(<NewRequest newLocation={newLocation}/>);
		wrapper.setState({request: {body: ""}})
		const form = wrapper.find('form');		
		form.simulate('submit');

		expect(handleNewRequest).toHaveBeenCalled();
	})
})