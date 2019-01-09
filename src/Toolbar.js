import React from 'react'

function Toolbar(props){
    return(
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={props.selectAll}>
            <i className={props.selection}></i>
          </button>

          <button className="btn btn-default" disabled={props.dis} onClick={props.markRead}>
            Mark As Read
          </button>

          <button className="btn btn-default" disabled={props.dis} onClick={props.markUnread}>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled={props.dis} onChange={}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={props.dis}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={props.dis}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
}

export default Toolbar