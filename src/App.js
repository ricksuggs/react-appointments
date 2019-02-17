import React, { Component } from 'react';
import './App.css';
import AppointmentDialog from './appointment-dialog/AppointmentDialog';
import AppointmentOptions from './appointment-options/AppointmentOptions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dialogOpen: false,
      timeSlot: null
    };
  }

  openDialog(timeSlot) {
    this.setState({
      dialogOpen: true,
      timeSlot
    });
  }

  closeDialog() {
    this.setState({
      dialogOpen: false,
      timeSlot: null
    });
  }

  render() {
    const { dialogOpen, timeSlot } = this.state;
    return (
      <div className="app">
        <div className="header">
          <h1 className="bp3-heading">Appointments</h1>
        </div>
        <div className="content">
          <AppointmentOptions openDialog={this.openDialog.bind(this)} />
        </div>
        {timeSlot && (
          <AppointmentDialog
            timeSlot={timeSlot}
            isOpen={dialogOpen}
            closeDialog={this.closeDialog.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default App;
