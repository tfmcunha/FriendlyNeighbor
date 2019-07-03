import { configure, shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.renderer = renderer; 
