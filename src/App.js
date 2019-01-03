import React, { Component } from 'react';
import './App.css';
import Toolbar from './Toolbar'
import MessageList from './MessageList'

class App extends Component {
  render() {
    return (
      <div className="">
        <Toolbar />
        <MessageList />
      </div>
    );
  }
}

export default App;
