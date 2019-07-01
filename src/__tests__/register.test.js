import React from 'react';
import { mount, shallow } from 'enzyme';

import Register from '../components/register';

describe('Register', () => {
	let wrapper;

	it('has 5 input fields', () => {
		wrapper = shallow(<Register />);
		expect(wrapper.find({type: "text"}).length).toEqual(2)
		expect(wrapper.find({type: "email"}).length).toEqual(1)
		expect(wrapper.find({type: "password"}).length).toEqual(1)
		expect(wrapper.find({type: "file"}).length).toEqual(1)
	})

	it('changes state when writing into an input field', () => {
			
		wrapper = shallow(<Register />);
		
		const event = {target: { name:"email", value: "test" }};
		const field = wrapper.find({ type: "email" });
		field.prop("onChange")(event);

		expect(wrapper.state().email).toEqual("test");
	})

	it('calls function that sends new user data to server on button click', () => {
		const handleRegister = jest.spyOn(Register.prototype, 'handleRegister');
		wrapper = mount(<Register />);
		const form = wrapper.find('form');		
		form.simulate('submit');

		expect(handleRegister).toHaveBeenCalled();
	})
})