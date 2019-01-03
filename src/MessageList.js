import React, {Component} from 'react'
import Message from './Message'
import axios from 'axios'

class MessageList extends Component{
  constructor(props){
    super(props)

    this.state={
      messages: [{
        "body": "Words are cool, they should appear here",
        "id": 0,
        "labels": [],
        "read": false,
        "selected": false,
        "starred": false,
        "subject": "SUBJECT HERE"}]
    }
  }

  componentDidMount(){
    this.getMessages()
  }

  getMessages = async() => {
    try{
      let results = await axios.get('http://localhost:8082/api/messages')
      this.setState({
        messages: results.data
      })
    } catch(err) {
      console.log(err)
    }
  }

  render(){
   return(
      <div className='container'>
      {this.state.messages.map(message => {
        return <Message key={message.id} {...message}/>
      })}
    </div>
   )
  }
}

export default MessageList