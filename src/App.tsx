import React from 'react';
import './App.css';

import {
  Container
} from '@material-ui/core'

import Posts from './components/Posts'

function App() {
  return (
    <div className="App">
      <Container>
        <Posts/>
      </Container>
    </div>
  );
}

export default App;
