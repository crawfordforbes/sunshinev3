import React, { Component, PropTypes } from 'react'

import Carousel from './Carousel'
import $ from 'jquery'

class Body extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {pics: this.props.pics, posts: this.props.posts, section: "news", loading: true}
  }
  htmlify(string){

    return {__html: string}
  }

  getContent(){

    //return {__html: this.state.posts[0].title}
    let posts = this.props.posts
    let pics = this.props.pics
    let that = this
    let content = [];
    if(this.state.section !== "pics"){
      
      content = posts.filter(function(post){
        return post.section === that.state.section
      })

      let html = content.map(function(post){

        return <div key={post.id} className="postWrapper">
        <h3 dangerouslySetInnerHTML={that.htmlify(post.title)} />
        <p dangerouslySetInnerHTML={that.htmlify(post.story)} />
        </div>
      })

      return html
    } else {
      return <Carousel
        pics={this.props.pics} />
    }
  }
  nav(e){
    if(this.state.loading){
    	this.setState({section: e.target.id, loading: false})
  	} else {
  		this.setState({section: e.target.id, loading: false})
  	}

  }
   toggleLoading(){
  	if(this.state.loading){
  		this.setState({loading: false})
  	}
  }
	render() {

		let content;
		if(this.state.loading){
			content = <div className="overlay" onClick={()=>this.toggleLoading()}><p className="overlayX">x</p><a className="overlayLink" href="https://sunshinenights.bandcamp.com/album/a-brooklyn-biograghy?action=buy&from=embed" target="_blank"><div className="overlayText">Click here to preorder Sunshine's new record A Brooklyn Biography.</div></a></div>
		} else if (this.props.posts.length < 1){
			
			content = <p>loading...</p>
		} else {
			content = this.getContent()
		}

    return (
     <div>
     <div className="row">
     <ul id="nav">
     <li className="top_nav" id="news" onClick={this.nav.bind(this)}>news</li>
     <li className="top_nav" id="shows" onClick={this.nav.bind(this)}>shows</li>
     <li className="top_nav" id="pics" onClick={this.nav.bind(this)}>pics</li>
     <li className="top_nav" id="press" onClick={this.nav.bind(this)}>press</li>
     <li className="top_nav" id="videos" onClick={this.nav.bind(this)}>videos</li>
     <li className="top_nav" id="contact" onClick={this.nav.bind(this)}>contact</li>
     <li className="top_nav" id="store" onClick={this.nav.bind(this)}>store</li>
     </ul>
     </div>

     {content}

     </div>
     )
  }
}

// Body.propTypes = {
//   data: PropTypes.object.isRequired,
//   actions: PropTypes.object.isRequired
// }

export default Body
