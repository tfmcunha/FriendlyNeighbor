import React from 'react';
import { shallow } from 'enzyme';

import Splash from '../components/splash';

describe('splash', () => {
	let wrapper;

	it('has two buttons', () => {
		wrapper = shallow(<Splash />);
		expect(wrapper.find('Button').length).toEqual(2);
	})

	it('has Register component', () => {
		wrapper = shallow(<Splash />);
		expect(wrapper.find('Register').length).toEqual(1);
	})

	it('has LoginForm component', () => {
		wrapper = shallow(<Splash />);
		expect(wrapper.find('LoginForm').length).toEqual(1);
	})
})