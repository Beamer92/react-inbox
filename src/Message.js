import React, {Component} from 'react'
import axios from 'axios'

class Message extends Component{
  constructor(props){
    super(props)

    this.state={
      showBody: null,
      star: props.starred ? 'star fa fa-star-o' :  'star fa fa-star',
      labelList: props.labels.map(lab => <span key={lab} className="label label-warning">{lab}</span>),
      checkboxCheck: '',
      read: this.props.read ? 'read ' : 'unread ',
      selected: ''
    }
  }

  readUnread = () => {
    if(this.props.read === false){
      axios.patch('http://localhost:8082/api/messages',{ messageIds:[this.props.id], command:'read'})
      .then(()=>{
        this.seeBody()
      })
    }
    else {
      this.seeBody()
    }
  }

  seeBody = () => {
    if(this.state.showBody){
      this.setState({showBody: null})
    }
    else{
      this.setState({
        showBody: <div className="row message-body">
                    <div className="col-xs-11 col-xs-offset-1">
                      {this.props.body}
                     </div>
                    </div>,
                    
        read:'read '})
    }
  }

  checkChange = () => {
    if(this.state.checkboxCheck === ''){
      this.setState({checkboxCheck: 'checked', selected: 'selected'})
    }
    else{
      this.setState({checkboxCheck: '', selected: ''})
    }
  }

  starChange = () => {
    axios.patch('http://localhost:8082/api/messages',{ messageIds:[this.props.id], command:'star'})
    .then(()=>{
      if(this.state.star === 'star fa fa-star-o'){
        this.setState({star: 'star fa fa-star'})
      }
      else {
        this.setState({star: 'star fa fa-star-o'})
      }
    })
    .catch(error=> {
      console.log(error)
    })
  }

  render(){
    return(
      <div>
      <div className={"row message " + this.state.read + this.state.selected}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={this.state.checkboxCheck} onChange={this.checkChange}/>
          </div>
          <div className="col-xs-2">
            <i className={this.state.star} onClick={this.starChange}></i>
          </div>
        </div>
      </div>
      <div className='col-xs-11' onClick={this.readUnread}>
       {this.state.labelList}
       <a href="#">{this.props.subject}</a>
      </div>
    </div>
      {this.state.showBody}
    </div>
  )
  }
}

export default Message