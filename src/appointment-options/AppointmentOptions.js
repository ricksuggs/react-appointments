import React from 'react';
import './AppointmentOptions.css';
import { ButtonGroup, Button, Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const AppointmentOptions = ({ openDialog, timeSlots }) => {
  return (
    <div className="time-slots">
      <ButtonGroup vertical large fill>
        {timeSlots.map(timeSlot => {
          const timeSlotTaken = timeSlot.name || timeSlot.phone;
          return (
            <Button
              intent={timeSlotTaken ? Intent.DANGER : null}
              key={timeSlot.time}
              onClick={() => openDialog(timeSlot)}
            >
              {timeSlot.time}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
};

AppointmentOptions.propTypes = {
  openDialog: PropTypes.func.isRequired,
  timeSlots: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  timeSlots: state.timeSlots
});

export default connect(
  mapStateToProps,
  null
)(AppointmentOptions);
