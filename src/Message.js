import React, {Component} from 'react'
import axios from 'axios'

class Message extends Component{
  constructor(props){
    super(props)

    this.state={
      showBody: null,
      star: props.starred ? 'star fa fa-star-o' :  'star fa fa-star',
      labelList: props.labels.map(lab => <span key={lab} className="label label-warning">{lab}</span>),
      checkboxCheck: props.selected ? 'checked' : ''
    }
  }

  rowMess = (r, s) => {
    let res = 'row message '
    if(r === true) {res+= 'read '}
    else {res+= 'unread '}
    if(s === true) {res += 'selected '}
    return res
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
                    </div>
        
      })
    }
  }

  //include async calls to the server to change the state shown
  // http PATCH :8082/api/messages messageIds:='[8]' command=star
  checkChange = () => {
    if(this.state.checkboxCheck === ''){
      this.setState({checkboxCheck: 'checked'})
    }
    else{
      this.setState({checkboxCheck: ''})
    }

    // axios.patch('http://localhost:8082/api/messages',{ messageIds:[this.props.id], command:'select??????'})
    // .then(() => {
    // if(this.state.checkboxCheck === ''){
    //   this.setState({checkboxCheck: 'checked'})
    // }
    // else{
    //   this.setState({checkboxCheck: ''})
    // }
    // })
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
      <div className={this.rowMess(this.props.read, this.props.selected)}>
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
      <div className='col-xs-11' onClick={this.seeBody}>
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