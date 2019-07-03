import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router';
import Request from '../components/request';

describe('<Request />', () => {
	const request = {
		id: 1,
		conversations: [1,2]
	}
	
	it('renders the request as props', () => {
		const wrapper = mount(
			<MemoryRouter>
				<Request request={request}/>)
			</MemoryRouter>
		)
		expect(wrapper.find(Request).props().request.id).toEqual(1)
	})	
})