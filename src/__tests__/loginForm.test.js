import React from 'react';
import { mount, shallow } from 'enzyme';

import LoginForm from '../components/loginform';

describe('LoginForm', () => {
	let wrapper;

	it('has two input fields', () => {
		wrapper = shallow(<LoginForm />);
		expect(wrapper.find({type: "text"}).length).toEqual(1)
		expect(wrapper.find({type: "password"}).length).toEqual(1)
	})

	it('changes state when writing into input field', () => {
			
		wrapper = shallow(<LoginForm />);
		
		const event = {target: { name:"email", value: "test" }};
		const field = wrapper.find({ type: "text" });
		field.prop("onChange")(event);

		expect(wrapper.state().email).toEqual("test");
	})

	it('calls function that sends data to api on button click', () => {
		const handleLogin = jest.spyOn(LoginForm.prototype, 'handleLogin');
		wrapper = mount(<LoginForm />);
		const form = wrapper.find('form');		
		form.simulate('submit');

		expect(handleLogin).toHaveBeenCalled();
	})
})