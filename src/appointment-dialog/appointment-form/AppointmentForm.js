import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Classes,
  FormGroup,
  InputGroup,
  Button,
  Intent
} from '@blueprintjs/core';
import { updateTimeSlot } from '../../actions';
import PropTypes from 'prop-types';

export class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedTimeSlot: { ...props.timeSlot },
      validation: {
        name: {
          valid: true,
          message: 'The name must not be empty'
        },
        phone: {
          valid: true,
          message: 'The phone number must be in the format: 999-999-9999'
        }
      }
    };
  }

  phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  handlePhoneChange(event) {
    const phone = event.target.value;
    const phoneValid = this.phoneRegex.test(phone);
    this.setState({
      validation: {
        ...this.state.validation,
        phone: {
          ...this.state.validation.phone,
          valid: phoneValid
        }
      },
      updatedTimeSlot: {
        ...this.state.updatedTimeSlot,
        phone: event.target.value
      }
    });
  }

  handleNameChange(event) {
    const name = event.target.value;
    const nameValid = !!name;
    this.setState({
      validation: {
        ...this.state.validation,
        name: {
          ...this.state.validation.name,
          valid: nameValid
        }
      },
      updatedTimeSlot: {
        ...this.state.updatedTimeSlot,
        name: event.target.value
      }
    });
  }

  submitDisabled() {
    const { validation, updatedTimeSlot } = this.state;
    return !(
      updatedTimeSlot.name &&
      updatedTimeSlot.phone &&
      validation.name.valid &&
      validation.phone.valid
    );
  }

  submitFormAndCloseDialog() {
    this.props.submitForm(this.state.updatedTimeSlot);
    this.props.closeDialog();
  }

  render() {
    const { time, name, phone } = this.state.updatedTimeSlot;
    const validation = this.state.validation;
    return (
      <>
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Time">
            <InputGroup type="text" value={time} readOnly />
          </FormGroup>
          <FormGroup
            label="Name"
            helperText={!validation.name.valid && validation.name.message}
            intent={validation.name.valid ? Intent.PRIMARY : Intent.DANGER}
          >
            <InputGroup
              id="name-input"
              type="text"
              onChange={this.handleNameChange.bind(this)}
              value={name || ''}
            />
          </FormGroup>
          <FormGroup
            label="Phone"
            helperText={
              (!validation.phone.valid && validation.phone.message) || ''
            }
            intent={validation.phone.valid ? Intent.PRIMARY : Intent.DANGER}
          >
            <InputGroup
              id="phone-input"
              type="text"
              onChange={this.handlePhoneChange.bind(this)}
              value={phone || ''}
            />
          </FormGroup>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              disabled={this.submitDisabled()}
              intent={Intent.PRIMARY}
              onClick={this.submitFormAndCloseDialog.bind(this)}
            >
              Submit
            </Button>
          </div>
        </div>
      </>
    );
  }
}

AppointmentForm.propTypes = {
  timeSlot: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired
};

export default connect(
  null,
  {submitForm: updateTimeSlot}
)(AppointmentForm);
