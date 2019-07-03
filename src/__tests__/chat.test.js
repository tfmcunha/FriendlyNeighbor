import React from 'react';

import Chat from '../components/chat';

describe('<Chat />', () => {
	const props = {
		request_id:1,		
		sender_id:1,
		recipient_id:1,
		channels: [4,5],
		newChannel: ""			
	}

	const response = {message: {id: 1, body: "Hello", user_id: 2, conversation_id: 3}}
	
	it('incoming message sets state with conversation id ', () => {		
		const wrapper = mount(<Chat />)

		wrapper.instance().pushMessage(response.message, response.message.conversation_id)

		expect(wrapper.state().conversation_id).toEqual(3)
	})

	it('pushes the incoming message into the conversation', () => {
		const wrapper = mount(<Chat {...props}/>)		

		wrapper.instance().pushMessage(response.message, response.message.conversation_id)

		expect(wrapper.state().conversation[0]).toEqual(response.message)
	})

	it('create action-cable subscription for each existing channel', () => {
		const createSub = jest.spyOn(Chat.prototype, 'createSubscription');	
		const wrapper = mount(<Chat {...props}/>)	
		
		expect(createSub).toHaveBeenCalledTimes(2)		
		createSub.mockClear()
	})

	it('create action-cable subscription new channel', () => {
		const createSub = jest.spyOn(Chat.prototype, 'createSubscription');	
		const wrapper = mount(<Chat {...props}/>)	
		wrapper.setProps({newChannel: 6})

		expect(createSub).toHaveBeenCalledTimes(3)		
	})

	it('calls handleNewMessage on form submition', () => {
		const newMessageFn = jest.spyOn(Chat.prototype, 'handleNewMessage');	
		const wrapper = mount(<Chat />)	
		const form = wrapper.find('form')
		form.simulate('submit')
		expect(newMessageFn).toHaveBeenCalled()
	})

})
