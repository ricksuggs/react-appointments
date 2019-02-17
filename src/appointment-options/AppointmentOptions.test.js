import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import { AppointmentOptions } from './AppointmentOptions';
import { ButtonGroup, Button, Intent } from '@blueprintjs/core';

Enzyme.configure({ adapter: new Adapter() });

describe('<AppointmentOptions />', () => {
  it('renders without any buttons', () => {
    const props = {
      openDialog: stub(),
      timeSlots: []
    };

    const wrapper = shallow(
      <AppointmentOptions
        openDialog={props.openDialog}
        timeSlots={props.timeSlots}
      />
    );
    expect(wrapper.find(ButtonGroup)).to.have.lengthOf(1);
    expect(wrapper.find(Button)).to.have.lengthOf(0);
  });

  it('renders with buttons', () => {
    const props = {
      openDialog: stub(),
      timeSlots: [
        {
          time: 'foo',
          name: 'name',
          phone: 'phone'
        },
        {
          time: 'bar'
        }
      ]
    };

    const wrapper = shallow(
      <AppointmentOptions
        openDialog={props.openDialog}
        timeSlots={props.timeSlots}
      />
    );
    expect(wrapper.find(ButtonGroup)).to.have.lengthOf(1);
    expect(wrapper.find(Button)).to.have.lengthOf(2);

    expect(wrapper.find(Button).first().prop('intent')).equal(Intent.DANGER);
  });

  it('responds to clicks', () => {
    const props = {
      openDialog: stub(),
      timeSlots: [
        {
          time: 'foo'
        }
      ]
    };

    const wrapper = shallow(
      <AppointmentOptions
        openDialog={props.openDialog}
        timeSlots={props.timeSlots}
      />
    );
    wrapper.find(Button).first().simulate('click');

    expect(props.openDialog).to.have.property('callCount', 1);
  });
});
