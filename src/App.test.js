import React from 'react';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AppointmentDialog from './appointment-dialog/AppointmentDialog';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders without the AppointmentDialog', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().closeDialog();
    expect(wrapper.find(AppointmentDialog)).to.have.lengthOf(0);
  });

  it('renders with the AppointmentDialog', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().openDialog({
      time: '9:00am',
      name: 'Test',
      phone: '901-333-4479'
    });
    expect(wrapper.find(AppointmentDialog)).to.have.lengthOf(1);
  });
});
