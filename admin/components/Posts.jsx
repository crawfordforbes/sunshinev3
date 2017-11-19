import React, { Component, PropTypes } from 'react'


class Posts extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {editing: 0, deleting: 0}
    
  }
  toggleEdit(id){
  	this.setState({editing: id})
  }
  toggleDelete(id){
  	this.setState({deleting: id})
  }
  getPosts(section){
		
  	let posts = this.props.posts.filter((post)=>{
  		if(post.section === section){
  			return post
  		}
  	})
  	let editing = this.state.editing;
  	let deleting = this.state.deleting;
  	return posts.map((post, idx)=>{
  		if(post.id === editing){
  			let action = "/admin/post"
  			let deleteForm;
  			if(post.id === deleting){
  				deleteForm = <form action="/admin/post" method="POST"><input type="hidden" name="_method" value="delete" /><input type="hidden" name="id" value={post.id} /><button style={{display: "inline-block"}}>Delete</button></form>
  			} else {
  				deleteForm = <button>Check the box then click me to delete this post</button>
  			}
  			return (
  				<div key={post.id}>
  				<form key={post.id} action={action} method="POST">
  					<input type="hidden" name="_method" value="put" />
  					<input type="hidden" name="id" value={post.id} />
  					<textarea name="title" defaultValue={post.title} />
  					<textarea name="story" defaultValue={post.story} />
  					<select name="section" defaultValue={post.section}>
						
							<option value="shows">Shows</option>
							<option value="press">Press</option>
							<option value="videos">Videos</option>
							<option value="contact">Contact</option>
							<option value="store">Store</option>
						</select>
  					<button style={{display: "block"}}>update</button>
  				</form>
  				<button style={{display: "block"}} onClick={()=>{this.toggleEdit(0)}}>Cancel</button>
  				
  				<input type="checkbox" onClick={()=>this.toggleDelete(post.id)} />
  				{deleteForm}
  				</div>
  				)
  		} else {
  			
	  		return (
	  			<li key={post.id}>
	  				<h4>{post.title}</h4>
	  				<p>{post.story}</p>
	  				<button onClick={()=>{this.toggleEdit(post.id)}}>edit</button>
					</li>
				)
  		}
  	})
  }

  
  render() {
  	
  	

  	
    return (
    	<div>
    	<form action="/admin/post" method="post">
				<textarea name="title" placeholder="title, please" required></textarea>
				<textarea name="story" placeholder="story, please" required></textarea>
				<select name="section">
				
					<option value="shows">Shows</option>
					<option value="press">Press</option>
					<option value="videos">Videos</option>
					<option value="contact">Contact</option>
					<option value="store">Store</option>
				</select>
				<p>If a show, please enter a date in the following format: 2015-12-31</p>
				<input type="date" name="date"></input>
					<button>Submit</button>
			</form>
			
			<h3>Shows</h3>
			<ul>
			{this.getPosts("shows")}
			</ul>
			<h3>Press</h3>
			<ul>
			{this.getPosts("press")}
			</ul>
			<h3>Videos</h3>
			<ul>
			{this.getPosts("videos")}
			</ul>
			<h3>Contact</h3>
			<ul>
			{this.getPosts("contact")}
			</ul>
			<h3>Store</h3>
			<ul>
			{this.getPosts("store")}
			</ul>
			</div>
     )
  }
}



export default Posts
