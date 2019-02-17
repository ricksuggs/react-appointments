import React from 'react';
import { Dialog } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import AppointmentForm from './appointment-form/AppointmentForm';

const AppointmentDialog = ({ isOpen, closeDialog, timeSlot }) => {
  return (
    <Dialog
      title="Book an Appointment"
      isOpen={isOpen}
      onClose={closeDialog}
      autoFocus
      canEscapeKeyClose
      canOutsideClickClose
      enforceFocus
      usePortal
    >
      <AppointmentForm timeSlot={timeSlot} closeDialog={closeDialog} />
    </Dialog>
  );
};

AppointmentDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  timeSlot: PropTypes.object.isRequired
};

export default AppointmentDialog;
