import React from 'react';

import Chat from '../components/chat';

describe('<Chat />', () => {
	const props = {
		request_id:1,		
		sender_id:1,
		recipient_id:1,
		channels: [4,5]						
	}

	const response = {message: {id: 1, body: "Hello", user_id: 3} , id: 4}

	it('incoming message sets state with conversation id ', () => {		
		const wrapper = mount(<Chat />)

		wrapper.instance().handleReceived(response)

		expect(wrapper.state().conversation_id).toEqual(4)
	})

	it('pushes the incoming message into the conversation', () => {
		const wrapper = mount(<Chat {...props}/>)		

		wrapper.instance().handleReceived(response)

		expect(wrapper.state().conversation[0]).toEqual(response.message)
	})

	it('create action-cable subscription for each channel', () => {
		const createSub = jest.spyOn(Chat.prototype, 'createSubscription');	
		const wrapper = mount(<Chat {...props}/>)	
		
		expect(createSub).toHaveBeenCalledTimes(2)
	})

	it('calls handleNewMessage on form submition', () => {
		const newMessageFn = jest.spyOn(Chat.prototype, 'handleNewMessage');	
		const wrapper = mount(<Chat />)	
		const form = wrapper.find('form')
		form.simulate('submit')
		expect(newMessageFn).toHaveBeenCalled()
	})

})
