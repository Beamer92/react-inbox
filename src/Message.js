import React from 'react'


function Message(props){
  // constructor(props){
  //   super(props)

  //   this.state={
  //     showBody: null,
  //     star: props.starred ? 'star fa fa-star-o' :  'star fa fa-star',
  //     labelList: props.labels.map(lab => <span key={lab} className="label label-warning">{lab}</span>),
  //     read: this.props.read ? 'read ' : 'unread ',
  //     checked: false,
  //     selected: false
  //   }
  // }

  // readUnread = () => {state
  //   if(this.props.read === false){
  //     axios.patch('http://localhost:8082/api/messages',{ messageIds:[this.props.id], command:'read'})
  //     .then(()=>{
  //       this.seeBody()
  //     })
  //   }
  //   else {
  //     this.seeBody()
  //   }
  // }
  
  // seeBody = () => {
  //   if(this.state.showBody){
  //     this.setState({showBody: null})
  //   }
  //   else{
  //     this.setState({
  //       showBody: <div className="row message-body">
  //                   <div className="col-xs-11 col-xs-offset-1">
  //                     {this.props.body}
  //                    </div>
  //                   </div>,
                    
  //       read:'read '})state
  //   }
  // }

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

  // starChange = () => {
  //   axios.patch('http://localhost:8082/api/messages',{ messageIds:[this.props.id], command:'star'})
  //   .then(()=>{
  //     if(this.state.star === 'star fa fa-star-o'){
  //       this.setState({star: 'star fa fa-star'})
  //     }
  //     else {
  //       this.setState({star: 'star fa fa-star-o'})
  //     }
  //   })
  //   .catch(error=> {
  //     console.log(error)
  //   })
  // }

    return(
      <div>
      <div className={"row message " + this.props.read + this.props.selected}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked='{***}' onChange='{***}'/>
          </div>
          <div className="col-xs-2">
            <i className={this.props.star} onClick={this.props.starChange}></i>
          </div>
        </div>
      </div>
      <div className='col-xs-11' onClick={this.props.readUnread}>
       {this.props.labelList}
       <a href="#">{this.props.subject}</a>
      </div>
    </div>
      {this.props.showBody}
    </div>
  )
}

export default Message