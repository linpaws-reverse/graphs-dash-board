import React, { Component } from 'react';
import './App.css';

import AppContainer from './container/AppContainer'

class App extends Component {
  render() {
    return (
      <div id={'app'} className="App inheritH">
        <header className="App-header">
          <h1 className="App-title">Welcome </h1>
        </header>
        <AppContainer/>
      </div>
    );
  }
}

export default App;
