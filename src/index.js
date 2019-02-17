import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configureStore } from 'redux-starter-kit';
import timeSlotsReducer from './reducers/timeSlots';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    timeSlots: timeSlotsReducer
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
