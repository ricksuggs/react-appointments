import reducer from './timeSlots';
import { updateTimeSlot } from '../actions';
import { expect } from 'chai';

describe('timeSlots reducer', () => {
  it('return the initial state', () => {
    expect(reducer(undefined, {})).to.have.lengthOf(9);
  });

  it('should handle UPDATE_TIME_SLOT', () => {
    const timeSlot = {
      time: '9:00am',
      name: 'John',
      phone: '901-374-8273'
    };

    const initialState = reducer(undefined, {});
    expect(initialState[0].time).equal('9:00am');
    expect(initialState[0].name).equal(null);
    expect(initialState[0].phone).equal(null);

    const updatedState = reducer(undefined, {
      type: updateTimeSlot.type,
      payload: timeSlot
    });

    expect(updatedState[0].time).equal('9:00am');
    expect(updatedState[0].name).equal('John');
    expect(updatedState[0].phone).equal('901-374-8273');
  });
});
