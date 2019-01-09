import React, {Component} from 'react'
import Message from './Message'
import Toolbar from './Toolbar'
import axios from 'axios'
import Compose from './ComposeMessage'

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
      tbSel: 'fa fa-square-o',
      unread: 0,
      composing: false,
      composeSub: '',
      composeBody: ''
    }
  }

  componentDidMount(){
    this.getMessages()
  }

  getMessages = async() => {
    try{
      let results = await axios.get('http://localhost:8082/api/messages')
      let unreadCount = results.data.reduce(((a,b) => !b.read ? a+1 : a), 0)
      this.setState({
        messages: results.data,
        unread: unreadCount,
        composeSub: '',
        composeBody: '',
        composing: false
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
        this.setState({
          messages: this.state.messages.map(message => message.id === id ? { ...message, reading: !message.reading, read: true } : message),
          unread: this.state.unread-1
        })
      }
      else {
        this.setState({
          messages: this.state.messages.map(message => message.id === id ? { ...message, reading: !message.reading, read: true } : message)
        })
      }
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

  markRead = async(name) => {
    try {
      const tf = name === 'read' ? true: false
      await axios.patch('http://localhost:8082/api/messages',{messageIds:Array.from(this.state.selected), command:'read', read: tf})
      this.getMessages()
    } catch(err) {
      console.log(err)
    }
  }

  captureLabel = async (command, val) => {
    try {
      await axios.patch('http://localhost:8082/api/messages', {messageIds:Array.from(this.state.selected), command:`${command}Label`, label: val})
      this.getMessages()
    } catch(err) {
      console.log(err)
    }
  }

  deleteSelected = async () => {
    try{
      console.log(this.state.selected)
      await axios.patch('http://localhost:8082/api/messages', {messageIds:Array.from(this.state.selected), command:`delete`})
      this.getMessages()
      this.setState({
        selected: new Set()
      })
    } catch(err){
      console.log(err)
    }
  }

  submitCompose = async(event) => {
    event.preventDefault()
    if(this.state.composeSub !== '' && this.state.composeBody !== ''){
      try{
        const newMessage ={
          body: this.state.composeBody,
          subject: this.state.composeSub
        }
        await axios.post('http://localhost:8082/api/messages', newMessage)
        this.getMessages()
      } catch(err) {
        console.log(err)
      }
    }
    else {
      //error message of some sort
    }
  }

  changeCompose= (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleComposePlus = () => {
    this.setState({
      composing: !this.state.composing
    })
  }
 
  render(){
   return(
      <div className='container'>
       <Toolbar 
          selection={this.state.tbSel} 
          selectAll={() => this.selectAll(this.state.tbSel)} 
          dis={this.state.tbDisable} 
          markRead={this.markRead} 
          markUnread={this.markRead}
          captureLabel = {this.captureLabel}
          unread={this.state.unread}
          deleteSelected={this.deleteSelected}
          handleComposePlus={this.handleComposePlus}/>

      {this.state.composing === false ? '' : <Compose 
                                              composeBody={this.state.composeBody} 
                                              composeSubject={this.state.composeSub} 
                                              changeCompose={this.changeCompose}
                                              submitCompose={this.submitCompose}/>}

      {this.state.messages.map(message => {
        return <Message 
                  key={message.id} 
                  star={message.starred ? 'star fa fa-star-o' :  'star fa fa-star'}
                  starChange={() => this.starChange(message.id)}
                  labelList={message.labels.map(lab => <span key={lab} className="label label-warning">{lab}</span>)}
                  read={message.read}
                  readUnread={()=> {this.readUnread(message.id)}}
                  body={message.body}
                  reading={message.reading}
                  subject={message.subject}
                  selected={this.state.selected.has(message.id) ? 'selected ' : ''}
                  select={() => {this.indiSelect(message.id)}}/>
      })}
    </div>
   )
  }
}

export default MessageList