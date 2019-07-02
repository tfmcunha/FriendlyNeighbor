import React from 'react';

import Menu from '../components/menu';


describe('<Menu />', () => {
	const user = {first_name: "Tiago"}

	it('renders the first name of the user', () => {
		const wrapper = mount(<Menu user={user}/>)	
		expect(wrapper.find('NavDropdown').props().title).toEqual("Hello, Tiago")		

	})
})