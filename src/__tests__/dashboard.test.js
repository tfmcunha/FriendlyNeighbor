import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import Dashboard from '../components/dashboard';
import Auth from '../modules/auth';
import NotFound from '../components/404notfound';
import Menu from '../components/menu';
import RequestMap from '../components/map';

describe('<Dashboard />(authenticated)', () => {
	const setToken = Auth.authenticateToken({"token": "something"})
	const isAuthenticated = Auth.isUserAuthenticated()

	it('renders page not found', () => {
		const wrapper = mount(
		    <MemoryRouter initialEntries={[ '/dashboard/test' ]}>
		      <Dashboard />
		    </MemoryRouter>
		);
	    expect(wrapper.find(NotFound)).toHaveLength(1)
	})

	it('renders the menu', () => {
		const wrapper = shallow(<Dashboard />)
		
		expect(wrapper.find(Menu)).toHaveLength(1)		
	})

	it('renders the map', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={[ '/dashboard' ]}>
		      <Dashboard />
		    </MemoryRouter>
		);

		expect(wrapper.find(RequestMap)).toHaveLength(1)
	})

	it('gets current location on mount', () => {
		const getLocation = jest.spyOn(Dashboard.prototype, 'getLocation')

		const wrapper = mount(
			<MemoryRouter initialEntries={[ '/dashboard' ]}>
		      <Dashboard />
		    </MemoryRouter>
		)		

		expect(getLocation).toHaveBeenCalledTimes(1)
	})	
})






