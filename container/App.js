import React, {Component, PropTypes} from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store'
import Body from '../components/Body'
import * as OtherActions from '../actions/index'

class App extends Component {
	render() {
		const {view, actions} = this.props
		return (
			<div>
				<Body view={view} actions={actions} />
			</div>)
	}
}

App.propTypes = {
	actions: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return {
		view: state.view
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(OtherActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(App)