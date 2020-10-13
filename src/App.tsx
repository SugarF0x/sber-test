import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import {
  Container,
} from '@material-ui/core';
import store from './store';

import Posts from './components/Posts';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Container>
          <Posts />
        </Container>
      </Provider>
    </div>
  );
}

export default App;
