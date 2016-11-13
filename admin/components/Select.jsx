import React, {Component, PropTypes} from 'react'

class Select extends Component {
	constructor(props, context) {
		super(props, context)

	}
	handleChange(e){
	console.log("handleChange")
		this.props.actions.updateSettings(this.props.setting, parseInt(e.target.value))
	}
	render() {
		let options = this.props.options.map((option, idx)=>{
			return <option key={option} value={option} >{option}</option>
		});
		let selected = this.props.selected ? this.props.selected : ""
		return(
			<select value={selected} onChange={this.handleChange.bind(this)}>
				{options}
			</select>
		)
	}
}

Select.propTypes = {
  
  actions: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default Select