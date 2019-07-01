import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import Main from'../components/main'; 
import Dashboard from '../components/dashboard';
import Splash from '../components/splash';
import NotFound from '../components/404notfound';

describe('Main', () => {
	it('renders splash', () => {
	  const wrapper = mount(
	    <MemoryRouter initialEntries={[ '/' ]}>
	      <Main/>
	    </MemoryRouter>
	  );	   
	  expect(wrapper.find(Splash)).toHaveLength(1);  
	});

	it('does NOT render Dashboard without authentication', () => {
	  const wrapper = mount(
	    <MemoryRouter initialEntries={[ '/dashboard' ]}>
	      <Main/>
	    </MemoryRouter>
	  );
	  expect(wrapper.find(Dashboard)).toHaveLength(0); 
	  expect(wrapper.find(Splash)).toHaveLength(1);  
	});	

	it('renders 404 not found page', () => {
		const wrapper = mount(
		    <MemoryRouter initialEntries={[ '/test' ]}>
		      <Main/>
		    </MemoryRouter>
		);
	    expect(wrapper.find(NotFound)).toHaveLength(1)
	  
	})
})
	