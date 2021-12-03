import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import { store } from './configure-store';
import { Container } from './Container';

const App = () => (
  <Provider store={store}>
    <Container />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));