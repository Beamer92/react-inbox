import React from 'react'
import { white, black } from 'ansi-colors';

export default function Toast(props){
  
  const divStyle = {
    position: 'relative',
    minHeight: '40px',
    margin: '1em'
  }

  const toastStyle = {
    position: 'absolute',
    top: 0,
    right: '50%',
    width: '30%'
  }

  const toastBody={
    backgroundColor: 'red',
    color: 'black'
  }

  return(
  <div aria-live="polite" aria-atomic="true" style={divStyle}>
    <div className="toast" style={toastStyle}>
      <div className="toast-header">
        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={props.Close}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body" style={toastBody}>
        Message needs to include a Subject and Body
      </div>
    </div>
</div>
)}