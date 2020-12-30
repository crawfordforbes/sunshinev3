import React, { Component, PropTypes } from 'react'

import Carousel from './Carousel'
import $ from 'jquery'

class Body extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {pics: this.props.pics, posts: this.props.posts, section: "shows", loading: false}
  }
  htmlify(string){

    return {__html: string}
  }
  componentDidUpdate(){
  if(!this.props.loading){
  	this.setState({loading: false})
  }
  }

  getContent(){

    //return {__html: this.state.posts[0].title}
    let posts = this.props.posts
    let pics = this.props.pics
    let that = this
    let content = [];
    if(this.state.section !== "pics" && this.state.section !== "about" ){
      
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
    } else if(this.state.section === "pics") {
      return <Carousel
        pics={this.props.pics} />
    } else {
    	return <div className="postWrapper">
    	<h3>About</h3>
    	<p>We are a band and songwriting partnership between Amy Priya and Stephen Sunshine. We perform live both as a duo and as a larger band consisting of a variety of players: drum set, a second guitar, mandolin,
			trumpet, saxophone, fiddle, lap steel, percussion or/and a third vocalist.</p>
			<p>We perform in NYC regularly with a great community of fellow artists. We also tour a good part of the year in Quebec, America’s South & East Coast as well as Western Europe. <strong>We are always open to expand our tour stops, so please reach out if you want us to come play your town.</strong></p>
			<p>We have started our own label, Wake Up Records, and have put out 9 releases. Four of these are full length Sunshine Nights albums. With COVID, like many of our colleagues we were forced to cancel several North American and European tours. With the extra time on our hands, we have been making our first remote album. We are tracking in our home studio, Happyland, while guitarist/mandolinist Steve Smith and drummers Tami Johnson and Kain Naylor are doing the same for us in their homes in MA, GA and SC. Engineer Robert Green of Unity Recording in Atlanta, GA is mixing the compiled tracks.</p>
			<p>The new album takes its inspiration from the road, lucid dreams, butterflies, and the BLM movement. If our last album, If We Stick Around, was a reaction to how the world is breaking to the point of a fever pitch, this new one explores how we can reflect on our changing world, and perhaps breathe more deeply once again.</p>
			<p>We love you all and are so happy to be sharing Sunshine Nights with you.</p>
			</div>
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
			content = <p className="body">loading...</p>
		// } else if (this.props.posts.length < 1){
			
		// 	content = <p>loading...</p>
		} else {
			content = this.getContent()
		}

    return (
     <div>
     <div className="row">
     <ul id="nav">
     
     <li className="top_nav" id="shows" onClick={this.nav.bind(this)}>shows</li>
     <li className="top_nav" id="about" onClick={this.nav.bind(this)}>about</li>
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
