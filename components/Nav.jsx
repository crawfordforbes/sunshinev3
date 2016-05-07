import React, {Component, PropTypes} from 'react'

class Nav extends Component {
	constructor(props, context) {
		super(props, context)

	}
	render() {
		console.log(this)
		return(
			<div>
				<ul className="nav">
					<li id="contents" onClick={this.props.changeView.bind(this)}>Table of Contents</li>
					<li id="create" onClick={this.props.changeView.bind(this)}>Add a new song</li>
				</ul>
			</div>
		)
	}
}

export default Nav