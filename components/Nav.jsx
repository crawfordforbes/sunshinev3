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
					<li id="viewOne" onClick={this.props.changeView.bind(this)}>ViewOne</li>
					<li id="viewTwo" onClick={this.props.changeView.bind(this)}>ViewTwo</li>
				</ul>
			</div>
		)
	}
}

export default Nav