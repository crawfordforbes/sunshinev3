import React, { Component, PropTypes } from 'react'

import Carousel from './Carousel'
import $ from 'jquery'

class Body extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {pics: this.props.pics, posts: this.props.posts, section: "news"}
  }
  htmlify(string){

    return {__html: string}
  }

  getContent(){
    //return {__html: this.state.posts[0].title}
    let posts = this.state.posts
    let pics = this.state.pics
    let that = this
    let content = [];
    if(this.state.section !== "pics"){
      
      content = posts.filter(function(post){
        return post.section === that.state.section
      })

      let html = content.map(function(post){

        return <div key={post.id}>
        <h3 dangerouslySetInnerHTML={that.htmlify(post.title)} />
        <p dangerouslySetInnerHTML={that.htmlify(post.story)} />
        </div>
      })

      return html
    } else {
      return <Carousel
        pics={this.state.pics} />
    }
  }
  nav(e){
    
    this.setState({section: e.target.id})

  }
  render() {

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
     </ul>
     </div>

     {this.getContent()}

     </div>
     )
  }
}

// Body.propTypes = {
//   data: PropTypes.object.isRequired,
//   actions: PropTypes.object.isRequired
// }

export default Body
