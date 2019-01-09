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
      selected: new Set(),
      tbDisable: 'disabled',
      tbSel: 'fa fa-square-o'
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


  starChange = async(id) => {
    try{
      await axios.patch('http://localhost:8082/api/messages',{ messageIds:[id], command:'star'})
      this.getMessages()
    } catch(err) {
      console.log(err)
    }
  }

  readUnread = async(id) => {
    try{ 
      const mess = this.state.messages.find(x=> x.id === id)
      if(!mess.read){
        await axios.patch('http://localhost:8082/api/messages',{ messageIds:[id], command:'read', read: true})
      }
        this.setState({
          messages: this.state.messages.map(message => message.id === id ? { ...message, reading: !message.reading, read: true } : message)
        })
    } catch(err) {
      console.log(err)
    }
  }


  selectAll = (curSelection) => {
    if(curSelection !== "fa fa-square-o"){
      this.setState({
        selected: new Set(),
        tbDisable: 'disabled',
        tbSel: 'fa fa-square-o'
      })
    }
    else {
      this.setState({
        selected: new Set(this.state.messages.map(x => x.id)),
        tbDisable: '',
        tbSel: 'fa fa-check-square-o'
      })
    }
  }

  indiSelect = (id) => {
    if(this.state.selected.size === 0){
      this.setState({
        tbDisable: '',
        tbSel: 'fa fa-minus-square-o',
        selected: this.state.selected.add(id)
      })
    }
    else if(this.state.selected.size === this.state.messages.length){
      const newSelected = new Set(this.state.selected.values())
      newSelected.delete(id)
      this.setState({
        tbSel: 'fa fa-minus-square-o',
        selected: newSelected
      })
    }
    else {
      if(this.state.selected.has(id)){
        if(this.state.selected.size === 1){ //it's the only ID left, disable and set selected box to empty
          this.setState({
            tbDisable: 'disabled',
            tbSel: 'fa fa-square-o',
            selected: new Set()
          })
        }
        else{
          const newSelected = new Set(this.state.selected.values())
          newSelected.delete(id)
          this.setState({
            selected: newSelected
          })
        }
      }
      else{
        if(this.state.messages.length-1 === this.state.selected.size){ //the set has all EXCEPT this message
          this.setState({
            tbSel: 'fa fa-check-square-o',
            selected: this.state.selected.add(id)
          })
        }
        else {
          this.setState({
            selected: this.state.selected.add(id)
          })
        }
      }
    }
  }

  //first, we need to patch those in the selected set as read, then call getmessages

  markRead = async(selected = []) => {
    try {
      const arr = Array.from(selected)
      await axios.patch('http://localhost:8082/api/messages',{ messageIds:arr, command:'read', read: true})
      this.getMessages()
    } catch(err) {
      console.log(err)
    }
  }

  markUnread = async(selected = []) => {
    try {
      const arr = Array.from(selected)
      await axios.patch('http://localhost:8082/api/messages',{ messageIds:arr, command:'read', label: false})
      this.getMessages()
    } catch(err) {
      console.log(err)
    }
  }

  addLabel = async(selected = [], lbl) => {
    console.log('here')
    try {
      const arr = Array.from(selected)
      const result = await axios.patch('http://localhost:8082/api/messages',{ messageIds:arr, command:'addLabel', read: lbl})
      console.log(result)
      this.getMessages()
    } catch(err) {
      console.log(err)
    }
  }

  removeLabel = async(selected = [], lbl) => {
    try {
      const arr = Array.from(selected)
      await axios.patch('http://localhost:8082/api/messages',{ messageIds:arr, command:'removeLabel', read: lbl})
      this.getMessages()
    } catch(err) {
      console.log(err)
    }
  }

  captureLabel = (val) => {
    this.addLabel(this.state.selected, val)
  }
 
  render(){
   return(
      <div className='container'>
       <Toolbar selection={this.state.tbSel} 
                selectAll={() => this.selectAll(this.state.tbSel)} 
                dis={this.state.tbDisable} 
                markRead={() => this.markRead(this.state.selected)} 
                markUnread={() => this.markUnread(this.state.selected)}
                captureLabel = {this.captureLabel}/>
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
          selected={this.state.selected.has(message.id) ? 'selected ' : ''}
          select={() => {this.indiSelect(message.id)}}
        />
      })}
    </div>
   )
  }
}

export default MessageList