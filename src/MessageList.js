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
        "reading" : false,
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


  starChange = async(id) => {
    try{
      await axios.patch('http://localhost:8082/api/messages',{ messageIds:[id], command:'star'})
      this.getMessages()
    } catch(err) {
      console.log(err)
    }
  }

  // checkChange = () => {
  //     if(this.props.allSelected === 2){
  //       this.props.partialSelect()
  //     }

  //     if(this.state.checked === false) {
  //       this.setState({
  //         checked:true,
  //         selected: true
  //       })
  //     }
  //     else {
  //       this.setState({
  //         checked:false,
  //         selected:false
  //       })
  //     }
  // }

    // checked = () => {
  //     if(this.props.allSelected === 2) {
  //       return 'checked'
  //     }
  //     else if(this.state.checked === true){
  //       return 'checked'
  //     }
  //     else{
  //       return ''
  //     }
  // }

  // selected = () => {
  //   if(this.props.allSelected === 2) {
  //     return 'selected'
  //   }
  //   else if(this.state.selected === true){
  //     return 'selected'
  //   }
  //   else{
  //     return ''
  //   }
  // }

  readUnread = async(id) => {
    try{ 
      const mess = this.state.messages.find(x=> x.id === id)
      if(!mess.read){
        console.log('FALSE')
        await axios.patch('http://localhost:8082/api/messages',{ messageIds:[id], command:'read'})
        this.setState({
          messages: this.state.messages.map(message => message.id === id ? { ...message, reading: !message.reading, read: !message.read} : message)
        })
      }
      else{
        this.setState({
          messages: this.state.messages.map(message => message.id === id ? { ...message, reading: !message.reading } : message)
        })
      }
    } catch(err) {
      console.log(err)
    }
  }

  // For toolbar, we need an onclick method that sets things to all unselected, or all selected.
  // We also need to pass a property that updates it as individual message are selected
  //  So, start with the set being altered by the individual message,
  // then we'll pass that set to Toolbar and the function that similarly edits the slect set
 
  render(){
   return(
      <div className='container'>
       <Toolbar />
      {this.state.messages.map(message => {
        return <Message key={message.id} 
          star={message.starred ? 'star fa fa-star-o' :  'star fa fa-star'}
          starChange={() => this.starChange(message.id)}
          labelList={message.labels.map(lab => <span key={lab} className="label label-warning">{lab}</span>)}
          read={message.read}
          readUnread={()=> {this.readUnread(message.id)}}
          body={message.body}
          reading={message.reading}
          subject={message.subject}
          // selected={}
        />
      })}
    </div>
   )
  }
}

export default MessageList