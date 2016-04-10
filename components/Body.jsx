import React, { Component, PropTypes } from 'react'
import Header from './Header'
import Footer from './Footer'

class Body extends Component {
  constructor(props, context) {
    super(props, context)
    
  }

  componentDidMount(){

  }

  render() {
    let data = this.props.data.map(function(item, idx){
        return <p key={idx}>{item.title}</p>
    })
    return (
			<div>
				<Header />

          {data}
				<Footer />
			</div>
    )
  }
}

Body.propTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default Body
