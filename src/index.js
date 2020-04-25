import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'

import store from './store';

import './index.css';

console.log(store);
store.subscribe(() => {
  alert('store has changed');
});

// setTimeout(() => {
//   store.dispatch({
//     type: 'qwe',
//   });
//   console.log(store.getState());
// }, 1000)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
