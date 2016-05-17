import React, { Component, PropTypes } from 'react'
import Nav from './Nav'
import Home from './Home'
import ViewOne from './ViewOne'
import ViewTwo from './ViewTwo'

class Body extends Component {
  constructor(props, context) {
    super(props, context)
  }
  changeView(e){
    this.props.actions.updateView(e.target.id)
  }
  
  componentDidMount(){

  }

  render() {
    let view;
    switch (this.props.view) {
      case "home":
        view = <Home />
        break;
      case "viewOne":
        view = <ViewOne />
        break;
      case "viewTwo":
        view = <ViewTwo />
        break;
      default:
        view = <Home />
    }
    return (
			<div>
      <div id="home" onClick={this.changeView.bind(this)}>Table of Contents</div>
				<Nav 
        changeView={this.changeView.bind(this)} />
        {view}
          
				
			</div>
    )
  }
}

Body.propTypes = {
  view: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
}

export default Body
