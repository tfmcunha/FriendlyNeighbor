import React from 'react';
import { mount } from 'enzyme';

import Count from '../components/count'

describe('Request Counter', () => {
	let wrapper;

	it('creates actioncable consumer', () => {
		const createSocket = jest.spyOn(Count.prototype, 'createSocket');		
		mount(<Count />);	
		expect(createSocket).toHaveBeenCalledTimes(1);		
	})
})






