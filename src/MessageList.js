import React, {Component} from 'react'
import Message from './Message'
import Toolbar from './Toolbar'
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
        "starred": false,
        "subject": "SUBJECT HERE"}],
      selected: new Set()
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


  //handletoggleselected = (id) => {
/* const newSet = new Set(Array.from(this.state.selected))
  if(newSet.has(id)){
    newSet.delete(id)
  }  
  else ....

  this.setState({
    selected: newSet
  })
 */
  // }

//put Toolbar here also
//send all message stuff as props with work done here

  render(){
   return(
      <div className='container'>
       <Toolbar />
      {this.state.messages.map(message => {
        return <Message key={message.id} 
          
        
        
        />
      })}
    </div>
   )
  }
}

export default MessageList