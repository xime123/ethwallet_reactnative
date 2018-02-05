import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import rootSaga from './sagas/index';
import App from './App';

const store = configureStore();

// run root saga
store.runSaga(rootSaga);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;