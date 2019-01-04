import React, { Component } from 'react';
import './App.css';
import MessageList from './MessageList'

class App extends Component {
  constructor(props){
    super(props)

  }

  // selectAll = () => {
  //   if(this.state.allSelected === 0 || this.state.allSelected === 1){
  //     this.setState({
  //       allSelected:2
  //     })
  //   }
  //   else
  //   {
  //     this.setState({
  //       allSelected:0
  //     })
  //   }
  // }

  // partialSelect = () => {
  //   this.setState({
  //     allSelected:1
  //   })
  // }

  render() {
    return (
      <div className="">
        <MessageList />
      </div>
    );
  }
}

export default App;
