import React, {Component} from 'react'

class Toolbar extends Component{
  constructor(props){
    super(props)

    this.state = {
      addLabel: '',
      removeLabel: ''
    }
  }

  handleAddLabel = (event) => {
    this.props.captureLabel(event.target.value)
    // console.log(event.target.value)

    // this.setState({

    // })
  }


  render() {
    return(
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={this.props.selectAll}>
            <i className={this.props.selection}></i>
          </button>

          <button className="btn btn-default" disabled={this.props.dis} onClick={this.props.markRead}>
            Mark As Read
          </button>

          <button className="btn btn-default" disabled={this.props.dis} onClick={this.props.markUnread}>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled={this.props.dis} onChange={this.handleAddLabel}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={this.props.dis}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={this.props.dis}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  } 
}

export default Toolbar