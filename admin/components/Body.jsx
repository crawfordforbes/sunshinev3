import React, { Component, PropTypes } from 'react'

import Carousel from './Carousel'

import Posts from './Posts'
import Pics from './Pics'

class Body extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {pics: this.props.pics, posts: this.props.posts}
  }



  
  render() {
  	let view;
  	let link;
  	switch(this.props.view){
  		case "posts":
  			view = <Posts posts={this.props.posts} />
  			link = <li onClick={()=>this.props.actions.updateState("view", "pics")}>Manage pictures</li>
  		break;
  		case "pics":
  			view = <Pics />
  			link = <li onClick={()=>this.props.actions.updateState("view", "posts")}>Manage posts</li>
			break;
			default:
				view = <Posts />
				link = <li onClick={()=>this.props.actions.updateState("view", "pics")}>Manage pictures</li>
  	}
  	// console.log(view)
    return (
    	<div>
    	<form action="/admin/logout" method="POST">
					<input type="hidden" name="_method" value="delete" />
					<button>LOG OUT HERE</button>
				</form>
    	<ul>
    		
    		{link}
    		
				</ul>

				{view}
				
			</div>
     )
  }
}

// Body.propTypes = {
//   data: PropTypes.object.isRequired,
//   actions: PropTypes.object.isRequired
// }

export default Body
