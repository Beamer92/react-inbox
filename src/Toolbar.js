import React, {Component} from 'react'

class Toolbar extends Component{
  // constructor(props){
  //   super(props)

  // }
  
 selections = () => {
    if(this.props.allSelected === 0){
      return "fa fa-square-o"
    }
    else if(this.props.allSelected === 1){
      return "fa fa-minus-square-o"
    }
    else {
      return "fa fa-check-square-o"
    }
  }

  dis = () => {
    if(this.props.allSelected === 0){
      return 'disabled'
    }
    else{ 
      return ''
    }
  }

  render(){
    return(
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={this.props.selectAll}>
            <i className={this.selections()}></i>
          </button>

          <button className="btn btn-default" disabled={this.dis()}>
            Mark As Read
          </button>

          <button className="btn btn-default" disabled={this.dis()}>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled={this.dis()}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={this.dis()}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={this.dis()}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }

}

export default Toolbar