import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import {MemoryRouter} from 'react-router';

import App from '../App';

describe('<App />', () => {
	it('matches the snapshot', () => {
		const tree = renderer.create(<MemoryRouter><App /></MemoryRouter>).toJSON()
		expect (tree).toMatchSnapshot()
	})
})