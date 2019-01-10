import React from 'react'


function Message(props){
    return(
      <div>
      <div className={"row message " +  (props.read ? 'read ' : 'unread ') + props.selected}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={props.selected === '' ? false : true} onChange={props.select}/>
          </div>
          <div className="col-xs-2">
            <i className={props.star} onClick={props.starChange}></i>
          </div>
        </div>
      </div>
      <div className='col-xs-11' onClick={props.readUnread}>
       {props.labelList}
       <a href="#">{props.subject}</a>
      </div>
    </div>
      {props.reading ? <div className="row message-body"><div className="col-xs-11 col-xs-offset-1">{props.body}</div></div> : ''}
    </div>
  )
}

export default Message