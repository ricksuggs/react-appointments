import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import AppointmentDialog from './AppointmentDialog';
import { Dialog } from '@blueprintjs/core';

Enzyme.configure({ adapter: new Adapter() });

describe('<AppointmentDialog />', () => {
  it('renders open', () => {
    const props = {
      closeDialog: stub(),
      timeSlot: {
        time: 'foo'
      },
      isOpen: true
    };

    const wrapper = shallow(
      <AppointmentDialog
        closeDialog={props.closeDialog}
        timeSlot={props.timeSlot}
        isOpen={props.isOpen}
      />
    );
    expect(wrapper.find(Dialog)).to.have.lengthOf(1);
    expect(wrapper.find(Dialog).first().props()).to.have.property('isOpen', true);
  });
});
