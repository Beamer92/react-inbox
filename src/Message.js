import React from 'react'


function Message(props){
  // <div className="row message-body"><div className="col-xs-11 col-xs-offset-1">{props.body}</div></div>

    return(
      <div>
      <div className={"row message " + props.read + props.selected}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            {/* <input type="checkbox" checked='{***}' onChange='{***}'/> */}
            <input type="checkbox"></input>
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
      {/*body goes here when shown*/}
    </div>
  )
}

export default Message