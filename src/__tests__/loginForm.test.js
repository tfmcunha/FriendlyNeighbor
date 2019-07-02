import React from 'react';

import LoginForm from '../components/loginform';

describe('LoginForm', () => {	

	it('has two input fields', () => {
		const wrapper = shallow(<LoginForm />);
		expect(wrapper.find({type: "text"}).length).toEqual(1)
		expect(wrapper.find({type: "password"}).length).toEqual(1)
	})

	it('changes state when writing into input field', () => {
			
		const wrapper = shallow(<LoginForm />);
		
		const event = {target: { name:"email", value: "test" }};
		const field = wrapper.find({ type: "text" });
		field.prop("onChange")(event);

		expect(wrapper.state().email).toEqual("test");
	})

	it('calls function that sends data to api on button click', () => {
		const handleLogin = jest.spyOn(LoginForm.prototype, 'handleLogin');
		const wrapper = mount(<LoginForm />);
		const form = wrapper.find('form');		
		form.simulate('submit');

		expect(handleLogin).toHaveBeenCalled();
	})
})