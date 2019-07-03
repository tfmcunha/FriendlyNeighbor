import React from 'react';

import CancelAcc from '../components/cancelacc'

describe('<CancelAcc />', () => {
	it('renders a button', () => {
		const wrapper = mount(<CancelAcc />)
		expect(wrapper.find('button').text()).toEqual("Cancel Account")
	})

	it('button shows modal for confirmation', () => {
		const showModal = jest.spyOn(CancelAcc.prototype, 'handleShow')
		const wrapper = mount(<CancelAcc />)
		const button = wrapper.find('button')
		button.simulate("click")
		
		expect(showModal).toHaveBeenCalled()
	})
})