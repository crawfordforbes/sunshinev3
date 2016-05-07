import React, { Component, PropTypes } from 'react'
import Nav from './Nav'
import Home from './Home'
import Contents from './Contents'
import Create from './Create'

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
      case "contents":
        view = <Contents />
        break;
      case "create":
        view = <Create />
        break;
      default:
        view = <Home />
    }
    return (
			<div>
      <div id="home" onClick={this.changeView.bind(this)}>FAKEBOOK</div>
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
