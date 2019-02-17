import { createReducer } from 'redux-starter-kit';

const initialState = [
  { time: '9:00am', name: null, phone: null },
  { time: '10:00am', name: null, phone: null },
  { time: '11:00am', name: null, phone: null },
  { time: '12:00pm', name: null, phone: null },
  { time: '1:00pm', name: null, phone: null },
  { time: '2:00pm', name: null, phone: null },
  { time: '3:00pm', name: null, phone: null },
  { time: '4:00pm', name: null, phone: null },
  { time: '5:00pm', name: null, phone: null }
];

const timeSlots = createReducer(initialState, {
  'UPDATE_TIME_SLOT': (state, action) => {
    return state.map(timeSlot => {
      if (timeSlot.time !== action.payload.time) {
        return timeSlot;
      } else {
        return action.payload;
      }
    });
  }
});

export default timeSlots;
