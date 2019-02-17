import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import { AppointmentForm } from './AppointmentForm';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';

Enzyme.configure({ adapter: new Adapter() });

describe('<AppointmentForm />', () => {
  it('reacts to form input', () => {
    const props = {
      closeDialog: stub(),
      submitForm: stub(),
      timeSlot: {
        time: 'foo'
      }
    };

    const wrapper = shallow(
      <AppointmentForm
        closeDialog={props.closeDialog}
        submitForm={props.submitForm}
        timeSlot={props.timeSlot}
      />
    );
    expect(wrapper.find(FormGroup)).to.have.lengthOf(3);
    expect(wrapper.find(InputGroup)).to.have.lengthOf(3);
    
    
    wrapper.find('#name-input').first().simulate('change', { target: {value: 'John'}});
    wrapper.find('#phone-input').first().simulate('change', { target: {value: '901'}});

    expect(wrapper.state('updatedTimeSlot').name).to.equal('John');
    expect(wrapper.state('validation').name.valid).to.equal(true);

    expect(wrapper.state('updatedTimeSlot').phone).to.equal('901');
    expect(wrapper.state('validation').phone.valid).to.equal(false);

  });

  it('submits request', () => {
    const props = {
      closeDialog: stub(),
      submitForm: stub(),
      timeSlot: {
        time: 'foo'
      }
    };

    const wrapper = shallow(
      <AppointmentForm
        closeDialog={props.closeDialog}
        submitForm={props.submitForm}
        timeSlot={props.timeSlot}
      />
    );
  
    wrapper.find('#name-input').first().simulate('change', { target: {value: 'John'}});
    wrapper.find('#phone-input').first().simulate('change', { target: {value: '901'}});

    // phone number is invalid
    expect(wrapper.find(Button).prop('disabled')).to.equal(true);

    wrapper.find('#phone-input').first().simulate('change', { target: {value: '901-200-0193'}});

    // phone number is valid
    expect(wrapper.find(Button).prop('disabled')).to.equal(false);

    // name invalid
    wrapper.find('#name-input').first().simulate('change', { target: {value: ''}});
    expect(wrapper.find('[label="Name"]').prop('intent')).equal(Intent.DANGER);
    
    // name valid again
    wrapper.find('#name-input').first().simulate('change', { target: {value: 'George'}});
    expect(wrapper.find('[label="Name"]').prop('intent')).equal(Intent.PRIMARY);

    wrapper.find(Button).first().simulate('click');

    expect(props.submitForm).to.have.property('callCount', 1);
    expect(props.closeDialog).to.have.property('callCount', 1);

  });
});