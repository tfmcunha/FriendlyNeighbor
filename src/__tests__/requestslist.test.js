import React from 'react';

import RequestsList from '../components/requestslist';

describe('<RequestsList />', () => {
	const requests = [{
		id: 1,
		title: "request title"
	}]

	it('renders requests list', () => {
		const wrapper = mount(<RequestsList requests={requests}/>)

		expect(wrapper.find('button').length).toEqual(1)
	})

	it('renders request title', () => {
		const wrapper = mount(<RequestsList requests={requests}/>)

		expect(wrapper.find('button').text()).toEqual("request title")
	})
})