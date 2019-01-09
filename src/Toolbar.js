import React, {Component} from 'react'


class Toolbar extends Component{
  constructor(props){
    super(props)

    this.state = {
      add: '',
      remove: ''
    }
  }

  handleLabel = (event) => {
    this.props.captureLabel(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: ''
    })
  }

  handleMark = (event) => {
    this.props.markRead(event.target.name)
  }

  
  render() {
    return(
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unread}</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={this.props.handleComposePlus}>
           <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={this.props.selectAll}>
            <i className={this.props.selection}></i>
          </button>

          <button className="btn btn-default" name='read' disabled={this.props.dis} onClick={this.handleMark}>
            Mark As Read
          </button>

          <button className="btn btn-default" name='unread' disabled={this.props.dis} onClick={this.handleMark}>
            Mark As Unread
          </button>

          <select className="form-control label-select" name='add' disabled={this.props.dis} value={this.state.add} onChange={this.handleLabel}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" name='remove' disabled={this.props.dis} value={this.state.remove} onChange={this.handleLabel}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={this.props.dis} onClick={this.props.deleteSelected}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  } 
}

export default Toolbar