import App from './index';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store/index';

const store = configureStore();

function setup() {
  class Root extends Component {
    render() {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

module.exports = setup;