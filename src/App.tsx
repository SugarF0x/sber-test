import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import store        from './store';

import {
  Container,
} from '@material-ui/core';

import Posts from './components/Posts';

function App() {
  return (
    <div className="App">
      <Provider store={ store }>
        <Container>
          <Posts/>
        </Container>
      </Provider>
    </div>
  );
}

export default App;
