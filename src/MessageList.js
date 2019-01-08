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
        await axios.patch('http://localhost:8082/api/messages',{ messageIds:[id], command:'read', read: true})
      }
        this.setState({
          messages: this.state.messages.map(message => message.id === id ? { ...message, reading: !message.reading, read: true } : message)
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


  // For toolbar, we need an onclick method that sets things to all unselected, or all selected.
  // We also need to pass a property that updates it as individual message are selected
  //  So, start with the set being altered by the individual message,
  // then we'll pass that set to Toolbar and the function that similarly edits the slect set

  // selections = () => {
  //   if(this.state.selected.length === this.state.messages.length){
  //     return "fa fa-check-square-o"
  //   }
  //   else if(this.state.selected.length > 0){
  //     return "fa fa-minus-square-o"
  //   }
  //   else {
  //     return "fa fa-square-o"
  //   }
  // }

  // dis = () => {
  //   if(this.state.selected.length === 0){
  //     return 'disabled'
  //   }
  //   else{ 
  //     return ''
  //   }
  // }

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
 
  render(){
   return(
      <div className='container'>
       <Toolbar selection={this.state.tbSel} selectAll={() => this.selectAll(this.state.tbSel)} dis={this.state.tbDisable}/>
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